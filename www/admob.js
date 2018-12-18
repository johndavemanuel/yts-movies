var admobid={}
  if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
  banner: 'ca-app-pub-5793280052328718/3202992078',
  interstitial: 'ca-app-pub-5793280052328718/3202992078'
  }
}
else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
  banner: 'ca-app-pub-5793280052328718/3202992078',
  interstitial: 'ca-app-pub-5793280052328718/3202992078'
  };
}
else {
  admobid = { // for Windows Phone
  banner: 'cca-app-pub-5793280052328718/3202992078',
  interstitial: 'ca-app-pub-5793280052328718/3202992078'
  };
}
//code for pop-up-ads
if(AdMob) AdMob createBanner({
  adId:admobid.banner,
  position:AdMob.AD_POSITION.BOTTOM_CENTER,
  autoShow:true
});