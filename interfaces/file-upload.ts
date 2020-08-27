

export interface FileUpload {
    name:string;
    data: any;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;

    // mv es algo que viene con el file de la imagen con express
    mv: Function;
   
}