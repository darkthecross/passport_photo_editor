import React from 'react';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';
import { UpdateImage } from './image_functions';

const FileUploadComponent = () => {
    const runtime = 'tfjs';
    const async_detector = faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
        runtime,
        modelType: 'full',
        maxFaces: 2,
    });
    console.log(async_detector);

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    async function processChosenFiles(fs) {
        var cvs = document.getElementById("canvas");
        const ctx = cvs.getContext('2d');
        ctx.canvas.width = 800;
        ctx.canvas.height = 600;

        const detector = await async_detector;
        console.log(detector);

        var img = new Image();
        img.src = window.URL.createObjectURL(fs[0]);
        img.onload = (e => {
            console.log("width: " + img.naturalWidth + " / height: " + img.naturalHeight);

            try {
                detector.estimateFaces(img, { flipHorizontal: false }).then((faces) => {
                    console.log(faces);
                    if(faces.length != 1) {
                        alert("Detect face error! ");
                    }
                    const box = faces[0].box;
                    ctx.beginPath();
                    ctx.rect(box.xMin, box.yMin, box.width, box.height);
                    ctx.stroke();
                    UpdateImage(img, faces[0]);
                });
            } catch (error) {
                alert(error);
            }
        });
    }

    return (
        <div>
            <label className="btn mt-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            processChosenFiles(chosenFiles);
                        });
                    }}
                />
            </label>
            <div>
                <canvas id="canvas" className="mx-auto"></canvas>
            </div>
        </div>
    );
};

export default FileUploadComponent;