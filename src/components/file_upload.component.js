import React from 'react';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';

const FileUploadComponent = () => {
    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }
    return (
        <div>
            <label className="btn mt-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            var img = new Image();
                            var cvs = document.getElementById("canvas");
                            const ctx = cvs.getContext('2d');
                            img.src = window.URL.createObjectURL(chosenFiles[0]);
                            img.onload = (e => {
                                console.log("width: " + img.naturalWidth + " / height: " + img.naturalHeight);
                                ctx.drawImage(img, 0, 0);
                                const rgba = ctx.getImageData(
                                    0, 0, img.width, img.height
                                ).data;
                                console.log(rgba);
                            });
                        })
                    }}
                />
            </label>
            <canvas id="canvas" style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default FileUploadComponent;