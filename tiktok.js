const webhookUrl = 'https://discord.com/api/webhooks/1382377366663335966/x392T7iGr4svi0I57MgQZpeSTZ94veAi7Mk1wZPYiyhKs_AtNhWTNzywZZaMGM_rvIxF';
const tiktokUsername = 'zonegaming86';
let wasLive = false;

async function checkTikTokLive() {
  try {
    const response = await fetch(`https://www.tiktok.com/@${tiktokUsername}/live`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119 Safari/537.36'
      }
    });

    const html = await response.text();

    const isLive =
      html.includes('"LIVE"') ||
      html.includes('is LIVE') ||
      html.includes('LIVE now');

    if (isLive && !wasLive) {
      console.log(`🔴 ${tiktokUsername} is now LIVE on TikTok!`);

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'TikTok Live Alert',
          avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg',
          content: `🎉 **${tiktokUsername} is now LIVE on TikTok!**\n🎥 Watch here: https://www.tiktok.com/@${tiktokUsername}/live`
        })
      });
    }

    wasLive = isLive;
  } catch (err) {
    console.error('Error checking TikTok live status:', err.message);
  }
}

// ⏱️ Run every 20 seconds
setInterval(checkTikTokLive, 20 * 1000);
