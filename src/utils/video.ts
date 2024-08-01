// 屏幕捕获参数
const displayMediaOptions: any = {
  video: {
    cursor: "always",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};
// 定义函数
class recordVideo {
  // 保存窗口
  private captureStream: any = null;
  // 保存开始录制的视屏
  private mediaRecorder: any = null;
  //   保存录制视频
  private recordedBlobs: any[] = [];
  constructor() {
    // this.startCapture();
  }
  //   开始捕获
  startCapture() {
    this.recordedBlobs = [];
    var promise = new Promise((resolve: any, reject) => {
      if (!this.captureStream) {
        navigator.mediaDevices
          .getDisplayMedia(displayMediaOptions)
          .then((result: any) => {
            this.captureStream = result;
            console.log("选择窗口后", result);
            this.startRecording(result);
            resolve(true);
          });
      } else {
        this.startRecording(this.captureStream);
        resolve(true);
      }
    });
    return promise;
  }
  //   停止捕获
  stopCapture() {
    let tracks = this.captureStream.getTracks();
    tracks.forEach((track: any) => track.stop());
    this.captureStream = null;
  }
  // 找到支持的格式
  getSupportedMimeTypes() {
    const possibleTypes = [
      "video/webm;codecs=vp9,opus",
      "video/mp4;codecs=h264,aac",
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=h264,opus",
    ];
    return possibleTypes.filter((mimeType) => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
  }
  // 开始录制
  startRecording(captureStream: any) {
    const mimeType = this.getSupportedMimeTypes()[0];
    const options = { mimeType };
    // console.log(121212, this.captureStream, options);

    try {
      this.mediaRecorder = new MediaRecorder(captureStream, options);
      //   console.log(this.mediaRecorder, "123123");
    } catch (e) {
      //   showMsg(`创建MediaRecorder出错: ${JSON.stringify(e)}`);
      return;
    }
    this.mediaRecorder.ondataavailable = (event: any) => {
      if (event.data && event.data.size > 0) {
        console.log("handleDataAvailable", event);
        this.recordedBlobs.push(event.data);
      }
    };
    this.mediaRecorder.start();
  }
  //   保存
  handleDataAvailable(event: any) {
    console.log("handleDataAvailable", event);
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }
  //   停止录制
  //
  stopRecord(callback: Function) {
    this.mediaRecorder.stop();
    setTimeout(() => {
      callback(this.recordedBlobs);
    }, 1000);
  }
  // 下载视频
  downloadVideo() {
    const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "录屏_" + new Date().getTime() + ".webm";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}
export default new recordVideo();

