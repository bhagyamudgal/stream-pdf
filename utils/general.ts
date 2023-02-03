export const secondsToHms = (seconds: number) => {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour," : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds ") : "";
    const time = hDisplay + mDisplay + sDisplay;

    return time.trim().replace(/,*$/, "");
};
