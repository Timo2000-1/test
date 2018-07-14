// function animation() {
//     var e = document.getElementById("e");
//     var i = 0;
//     (function move() {
//         move.endTime || (move.endTime = Date.now() + 2000);
//         var ratio = Math.min(1, 1 - (move.endTime - Date.now()) / 2000);
//         e.style.left = e.style.top = 100 * ratio*ratio + "px";
//         if(ratio < 1) {
//             setTimeout(move, 10);
//         } else {
//             disappear();
//         }
//     })();
//     function dusappear() {
//         disappear.endTime || (disappear.endTime = Date.now() + 2000);
//         var ratio = Math.max(0, (disappear.endTime - Date.now()) / 2000);
//         e.style.opacity = ratio;
//         if(ratio > 0) {
//             setTimeout(disappear, 10);
//         }
//     };
// };

// みたらしくんを1秒後に1秒かけて座標(500, 150)へアニメーションさせる
   // animateTranslate('e', 1000, 500, 150, 1000);
   //
   /**
    * 対象オブジェクトをアニメーションして移動させます。
    * @param {string} targetID スクロール時間のミリ秒です。
    * @param {number} time アニメーションさせる時間です（ミリ秒）。
    * @param {number} endX X座標の目標値です。
    * @param {number} endY Y座標の目標値です。
    * @param {number} delay アニメーションを開始するまでの遅延時間です（ミリ秒）。
    */
   function animateTranslate(targetID, time, endX, endY, delay) {
     const target = document.getElementById(targetID); // アニメーションの対象
     const style = getComputedStyle(target); // 対象のスタイルを取得
     const reg = /matrix\((.*)\)/; // 不要な文字列を取り除くための正規表現
     const transform = style.transform.match(reg)[1].split(','); // transform を配列として取得
     const startX = parseFloat(transform[4]); // X座標の始点
     const startY = parseFloat(transform[5]); // Y座標の始点
     const diffX = endX - startX; // X座標の変化量
     const diffY = endY - startY; // Y座標の変化量
     let progress = 0;

     // アップデートを実行する
     requestAnimationFrame(update);
     function update(timestanp) {
       // 遅延時間を含めた進捗率を算出
       progress = (timestanp - delay) / time;
       // 進捗率が100%を超えないよう丸める
       progress = Math.min(progress, 1);

       // 進捗率がプラスの場合のみ値を算出し反映する
       if (progress >= 0) {
         const resultX = startX + diffX * progress; // X座標
         const resultY = startY + diffY * progress; // Y座標
         target.style.transform = `translate( ${resultX}px, ${resultY}px )`;
       }

       // 進捗が1未満の場合はアップデートを再実行する
       if (progress < 1) {
         requestAnimationFrame(update);
       }
     }
