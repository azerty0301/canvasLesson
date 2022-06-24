//canvas取得(画用紙)
const cvs=document.getElementById('cvs');
//2dコンテキスト取得(筆&絵の具)
const ctx=cvs.getContext('2d');
//キャンバスの大きさ設定
cvs.width=800;
cvs.height=500;

//キャンバスの背景色設定
ctx.fillStyle="#ddd";
ctx.fillRect(0,0,cvs.width,cvs.height);

//画像配列作成
const imgs=[new Image(),new Image(),new Image()];
const paths=["kaba1.jpg","kaba2.jpg","kaba3.jpg"];
for(let i=0;i<imgs.length;i++){
  imgs[i].src="./images/"+paths[i];
}

//すべての画像の読み込み完了時に動かすcallbackをセットする関数
const setLoadAllCallback=(imgs, callback) =>{//仮引数？引数にcallbackがあったら、第二引数は関数を使うんだな、と思う?
  let count = 0;
  for (let i = 0; i < imgs.length; i++) {
      imgs[i].onload = () =>{
          ++count;
          if (count === imgs.length) {
              callback(imgs);
          }
      };
  }
}
//実行
setLoadAllCallback(imgs,(imgs)=>{//実引数？読み込みが終わった時の処理
  let count=0;
  let timerId=setInterval(()=>{
      count++;
      let idx=Math.floor(Math.random()*imgs.length);
      let img=imgs[idx];
      ctx.save();
      ctx.translate(Math.random()*cvs.width,Math.random()*cvs.height);
      ctx.rotate(Math.random()*2*Math.PI);
      let width=Math.floor(Math.random()*200)+100;
      ctx.drawImage(img,0,0,width,width*3/4);
      ctx.restore();
      if(count > 100){
        clearInterval(timerId);//タイマーを止める
      }
  },30);//30ミリ秒ごとに。
});
