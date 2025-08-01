export declare class UploadS3Controller {
    constructor();
    uploadFile(file: Express.Multer.File): {
        url: string;
        key: any;
    };
}
