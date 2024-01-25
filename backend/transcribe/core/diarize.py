# https://github.com/pyannote/pyannote-audio/blob/develop/tutorials/applying_a_pipeline.ipynb

from channels.generic.websocket import WebsocketConsumer
import numpy as np
import pandas as pd
from pyannote.audio import Pipeline
from typing import Optional, Union
import torch

from .utils.audio import load_audio, SAMPLE_RATE
from ..core.transcriptionModels import DiarizarionOptions
from ..core.utils.db_utils import update_job_history
from ..constants import response_codes
from ..core.utils.commons import notify

class DiarizationPipeline:
    def __init__(
        self,
        diarization_options: DiarizarionOptions,
    ):
        device = diarization_options.device
        if isinstance(device, str):
            device = torch.device(device)
        self.model = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-3.1",
            use_auth_token="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",
        ).to(device)

    def __call__(
        self,
        consumer: WebsocketConsumer,
        request_id: str,
        audio: Union[str, np.ndarray],
        diarization_options: DiarizarionOptions,
    ):
        update_job_history(
            request_id, {"status": response_codes.DIARIZATION_IN_PROGRESS}
        )
        notify(
            consumer,
            {
                "id": request_id,
                "status": response_codes.DIARIZATION_IN_PROGRESS,
            },
        )
        if isinstance(audio, str):
            audio = load_audio(audio)
        audio_data = {
            "waveform": torch.from_numpy(audio[None, :]),
            "sample_rate": SAMPLE_RATE,
        }
        segments = self.model(
            audio_data,
            num_speakers=diarization_options.num_speakers,
            min_speakers=diarization_options.min_speakers,
            max_speakers=diarization_options.max_speakers,
        )
        diarize_df = pd.DataFrame(
            segments.itertracks(yield_label=True),
            columns=["segment", "label", "speaker"],
        )
        diarize_df["start"] = diarize_df["segment"].apply(lambda x: x.start)
        diarize_df["end"] = diarize_df["segment"].apply(lambda x: x.end)
        return diarize_df


def assign_speakers(
    consumer: WebsocketConsumer,
    diarize_df,
    request_id: str,
    transcript_result,
    fill_nearest=False,
):
    transcript_segments = transcript_result["segments"]
    for seg in transcript_segments:
        # assign speaker to segment (if any)
        diarize_df["intersection"] = np.minimum(
            diarize_df["end"], seg["end"]
        ) - np.maximum(diarize_df["start"], seg["start"])
        diarize_df["union"] = np.maximum(diarize_df["end"], seg["end"]) - np.minimum(
            diarize_df["start"], seg["start"]
        )
        # remove no hit, otherwise we look for closest (even negative intersection...)
        if not fill_nearest:
            dia_tmp = diarize_df[diarize_df["intersection"] > 0]
        else:
            dia_tmp = diarize_df
        if len(dia_tmp) > 0:
            # sum over speakers
            speaker = (
                dia_tmp.groupby("speaker")["intersection"]
                .sum()
                .sort_values(ascending=False)
                .index[0]
            )
            seg["speaker"] = speaker

        # assign speaker to words.
        if "words" in seg:
            for word in seg["words"]:
                if "start" in word:
                    diarize_df["intersection"] = np.minimum(
                        diarize_df["end"], word["end"]
                    ) - np.maximum(diarize_df["start"], word["start"])
                    diarize_df["union"] = np.maximum(
                        diarize_df["end"], word["end"]
                    ) - np.minimum(diarize_df["start"], word["start"])
                    # remove no hit
                    if not fill_nearest:
                        dia_tmp = diarize_df[diarize_df["intersection"] > 0]
                    else:
                        dia_tmp = diarize_df
                    if len(dia_tmp) > 0:
                        # sum over speakers
                        speaker = (
                            dia_tmp.groupby("speaker")["intersection"]
                            .sum()
                            .sort_values(ascending=False)
                            .index[0]
                        )
                        word["speaker"] = speaker
                if "speaker" not in word:
                    word["speaker"] = seg["speaker"]
    update_job_history(request_id, {"status": response_codes.DIARIZATION_COMPLETED})
    notify(
        consumer,
        {
            "id": request_id,
            "status": response_codes.DIARIZATION_COMPLETED,
        },
    )
    return transcript_result