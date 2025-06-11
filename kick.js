const webhookUrl = 'https://discord.com/api/webhooks/1382377366663335966/x392T7iGr4svi0I57MgQZpeSTZ94veAi7Mk1wZPYiyhKs_AtNhWTNzywZZaMGM_rvIxF';
const kickUsername = 'zonegaming86';
let wasLive = false;

async function checkKickLive() {
  try {
    const res = await fetch(`https://kick.com/api/v1/channels/${kickUsername}`);
    const data = await res.json();

    const isLive = data.livestream !== null;

    if (isLive && !wasLive) {
      console.log('🔴 ZoneGaming86 is now LIVE on Kick!');

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Kick Live Alert',
          avatar_url: 'https://kick.com/favicon.ico',
          content: `📢 **ZoneGaming86 is now LIVE on Kick!**\n🎮 Watch here: https://kick.com/${kickUsername}`
        })
      });
    }

    wasLive = isLive;
  } catch (err) {
    console.error('Error checking Kick live status:', err.message);
  }
}

setInterval(checkKickLive, 60 * 1000);

