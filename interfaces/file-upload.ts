

export interface FileUpload {
    name:string;
    data: any;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;

    // mv es un método que viene con express que nos permite el movimiento de archivos de las carpetas
    mv: Function;
   
}