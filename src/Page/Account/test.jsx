import React from 'react'
import Resizer from '../../script/react-file-image-resizer'
import * as JSZip from 'jszip'
import { saveAs } from "file-saver";

class Test extends React.Component {
    state = {
        image: null
    }

    convert = (e) => {

    }

    changeImage = (e) => {
        let file = e.target.files[0]
        let fileExt = file.name.split('.')[1]
        var zip = new JSZip();

        if (fileExt === 'png') {
            Resizer.imageFileResizer(
                file,
                400,
                400,
                fileExt,
                100,
                0,
                uri => {
                    var img = zip.folder("images");
                    img.file("smile.png", uri.blobImg, { base64: true });

                    zip.generateAsync({ type: "blob" }).then(function (content) {
                        // see FileSaver.js
                        saveAs(content, "example.zip");
                    });
                },
                'base64'
            );
        }
        else {
            zip.file('super.pdf', file)
            zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, "example.zip");
            });
        }
    }


    render() {
        return (
            <React.Fragment>
                <input type="file" onChange={this.changeImage} />
                <button onClick=" myFunction() "> Upload </button>
            </React.Fragment>
        )
    }

}

export default Test