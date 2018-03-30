export interface CameraSuccessCallback {
    message: string;
    options: CanvasCameraOptions;
    preview: {
        camera: {
            id: number;
        };
        focusMode: string;
        format: string;
        fps: {
            min: number;
            max: number;
        };
        height: number;
        width: number;
        started: boolean;
    };
    output: {
        images: {
            fullsize: {
                data: string;
                orientation: "portrait" | "landscape"
                rotation: number;
                timestamp: number;
            }
        }
    };
}