import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

export default function AudioVisualizer(props) {

    const { audioStream } = props;

    const [recordingTime, setRecordingTime] = useState(0);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [analyser, setAnalyser] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [audioSource, setAudioSource] = useState(null);

    useEffect(() => {
        if (!audioContext) {
            const context = new AudioContext();
            const analyserNode = context.createAnalyser();
            analyserNode.fftSize = 2048; // Adjust the fftSize for the resolution of the visualization
            setAnalyser(analyserNode);
            setAudioContext(context);
        }
    }, []);

    useEffect(() => {
        if (audioContext && !audioSource) {
            const source = audioContext.createMediaStreamSource(audioStream);
            source.connect(analyser);
            setAudioSource(source);
        }
    }, [audioContext, audioSource]);

    useEffect(() => {
        if (analyser && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const draw = () => {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                analyser.getByteTimeDomainData(dataArray);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.lineWidth = 2;
                ctx.strokeStyle = "#FFFFFF";

                ctx.beginPath();

                const sliceWidth = (canvas.width * 1.0) / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = (v * canvas.height) / 2;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();

                requestAnimationFrame(draw);
                console.log("Drawing now !")
            };

            draw();
        }
    }, [analyser]);


    return (
        <Flex className="audio-visualizer">
        <canvas ref={canvasRef} />
        </Flex>
    );
}
