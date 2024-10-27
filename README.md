Japanese Support Only

とりあえず、公式チャンネルへ向けて`会話ができる程度の物`を作成<br>
扱えるのは、以下のメッセージのみ。<br>
event.type='message'(text,sticker,image(ディレクトリに保存のみ),etc..)<br>

実行前に1️⃣ディレクトリには.envファイルを準備。<br>
内容は以下の通り。未使用（BASE_URL）もあるので適宜<br>
line developersに登録をして、CHANNEL_ACCESS_TOKEN（有効期限は気をつけて）とCHANNEL＿SECRETは一字も間違えてはいけない<br>
ubuntu@:$ cat .env
```
SVR_ADDR = 0.0.0.0
SVR_PORT = 3001
BASE_URL
CHANNEL_ACCESS_TOKEN = PRg〜ilFU=
CHANNEL_SECRET = 056〜7f5d
IMGF_DL_DIR = __dirname,./downloaded/
```
実行前に2️⃣.certフォルダに、SSL証明書を保存（pemファイルを2つ）<br>
これはline message apiとメッセージのやり取りの為に必須<br>
pemは、証明書または鍵のbase64保存形式です。※証明書または鍵を単独もしくはまとめて保存<br>

    ubuntu@:$ acme.sh --issue -d *.hi5kazjp-amz.com --dns dns_aws
    ubuntu@:$ acme.sh --install-cert --dns dns_aws -d (ドメイン) --key-file /home/ubuntu/.acme.sh/（ドメイン）_ecc/privkey.pem --fullchain-file /home/ubuntu/.acme.sh/（ドメインZ_ecc/fullchain.pem
    [Mon Sep  2〜2024] The domain '(ドメイン)' seems to already have an ECC cert, let's use it.
    [Mon Sep  2〜2024] Installing key to: /home/ubuntu/.acme.sh/（ドメイン）_ecc/privkey.pem
    [Mon Sep  2〜2024] Installing full chain to: /home/ubuntu/.acme.sh/（ドメイン）_ecc/fullchain.pem

実行前に3️⃣ linuxであればサービス起動の設定＜br>
ubuntu@:$ cat mbot-exps.sh<br>
```
#!/usr/bin/bash

source ~/.bashrc
cd ~/mbot-exps

# setup pem file
/usr/bin/cp -p ~/.acme.sh/'(ドメイン)_ecc'/*.pem .cert/.

#
logf='../logs/'`date '+%Y%m%d'.log`
/usr/bin/nohup /usr/local/bin/node dist/main.cjs &>> ${logf} &

exit 0
```

**Full Changelog**: https://github.com/kaz9hi5/mbot-exps/commits/basic
