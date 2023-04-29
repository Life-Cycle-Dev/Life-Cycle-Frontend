import React, { useEffect, useRef } from "react";

export default function Test() {
    const volume = useRef(0);

    const getMedia = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
                analyser.smoothingTimeConstant = 0.4;
                analyser.fftSize = 1024;
                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);
                javascriptNode.onaudioprocess = () => {
                    var array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    var values = 0;
                    var length = array.length;
                    for (var i = 0; i < length; i++) {
                        values += array[i];
                    }
                    volume.current = values / length;
                    console.log(values, volume.current);
                };
            })
            .catch(function (err) {
                console.log("The following error occured: " + err);
            });
    };

    useEffect(getMedia, []);

    return (
        <div className="App">
            testttt
        </div>
    );
};