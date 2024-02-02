from .models import TranscriptMetadata, TranscriptSegment
from django.http import JsonResponse
import json
from django.core.serializers import serialize
import logging
from .core.utils.db_utils import update_transcript_metadata, update_transcript_segment
from .core.utils.writer_utils import get_writers

logger = logging.getLogger(__name__)


# Performs Keyset pagination
def get_next_page(sort_order, filter_args, starting_values, page_size, model):
    for column in sort_order:
        if column not in filter_args and starting_values is not None:
            filter_args[column + "__gt"] = starting_values[column]

    # Perform the paginated query
    results = model.objects.filter(**filter_args).order_by(*sort_order)[:page_size]
    return results


def list_transcripts(request):
    try:
        objects = TranscriptMetadata.objects.all()
        return JsonResponse(
            {"status": "SUCCESS", "transcripts": serialize("json", objects)}
        )
    except Exception as e:
        errorMessage = f"Failed to retrive transcripts due to: {str(e)}"
        logger.error(errorMessage)
        return JsonResponse({"status": "FAILED", "errorMessage": errorMessage})


def delete_transcripts(request):
    try:
        json_data = json.loads(request.body.decode("utf-8"))
        transcriptionIds = json_data.get("transcriptionIds")
        TranscriptMetadata.objects.filter(transcriptionId__in=transcriptionIds).delete()
        logger.debug("Successfully deleted objects from TranscriptMetadata")
        TranscriptSegment.objects.filter(transcriptionId__in=transcriptionIds).delete()
        logger.debug("Successfully deleted objects from TranscriptSegment")
        return JsonResponse({"status": "SUCCESS"})
    except Exception as e:
        errorMessage = f"Failed to delete transcripts due to: {str(e)}"
        logger.error(errorMessage)
        return JsonResponse({"status": "FAILED", "errorMessage": errorMessage})


# TEST THIS API
def export_transcripts(request):
    try:
        json_data = json.loads(request.body.decode("utf-8"))
        transcriptionIdList = json_data.get("transcriptionIds")
        outputOptions = json_data.get("outputOptions")

        for transcriptionId in transcriptionIdList:
            writer = get_writers(
                output_dir=outputOptions.output_dir,
                output_formats=outputOptions.output_formats,
            )
            writer(
                result,
                outputOptions.output_file_name,
                outputOptions._asdict(),
            )
            logger.debug(f"Successfully exported Transcript {transcriptionId}")
        return JsonResponse({"status": "SUCCESS"})
    except Exception as e:
        errorMessage = f"Failed to export transcripts due to: {str(e)}"
        logger.error(errorMessage)
        return JsonResponse({"status": "FAILED", "errorMessage": errorMessage})


def get_transcript_page(request, transcriptionId):
    try:
        lastFetchedRecordId = float(request.GET.get("lastFetchedRecordId", 0.0))
        pageSize = int(request.GET.get("pageSize", 10000))

        sort_order = ["transcriptionId", "startTimeInSeconds"]
        filter_args = {"transcriptionId": transcriptionId}
        transcriptSegments = get_next_page(
            sort_order=sort_order,
            filter_args=filter_args,
            starting_values={"startTimeInSeconds": lastFetchedRecordId},
            page_size=pageSize,
            model=Transcript,
        )
        return JsonResponse(
            {
                "status": "SUCCESS",
                "transcriptSegments": serialize("json", transcriptSegments),
            }
        )
    except Exception as e:
        errorMessage = f"Failed to fetch transcript due to: {str(e)}"
        logger.error(errorMessage)
        return JsonResponse({"status": "FAILED", "errorMessage": errorMessage})


# TEST THIS API
def update_transcript(request):
    try:
        json_data = json.loads(request.body.decode("utf-8"))
        transcriptionId = json_data.get("transcriptionId")
        transcriptMetadataUpdateParams = json_data.get("metadata")
        transcriptSegmentUpdateParams = json_data.get("segments")

        update_transcript_metadata(transcriptionId, transcriptMetadataUpdateParams)
        logger.debug("Successfully updated TranscriptMetadata")

        for segment in transcriptSegments:
            update_transcript_segment(transcriptionId, segment)
            logger.debug(
                f"Successfully updated TranscriptSegment with start timestamp {segment['startTimeInSecond']}"
            )

        return JsonResponse({"status": "SUCCESS"})
    except Exception as e:
        errorMessage = f"Failed to update transcript due to: {str(e)}"
        logger.error(errorMessage)
        return JsonResponse({"status": "FAILED", "errorMessage": errorMessage})


# Not for Production
def reset_db(request):
    TranscriptMetadata.objects.all().delete()
    TranscriptSegment.objects.all().delete()
    return JsonResponse({"status": "SUCCESS"})
