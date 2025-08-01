export declare class UploadImageController {
    constructor();
    uploadPhoto(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
