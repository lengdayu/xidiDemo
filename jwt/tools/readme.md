将openssl的安装路径添加到系统环境变量中：C:\Program Files\OpenSSL-Win64\bin
生成私钥: openssl genrsa -out rsa_private_key.pem  1024
用私钥生成公钥：openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem

可选: 
对私钥进行pkcs8编码:openssl pkcs8 -in rsa_private_key.pem -topk8 -out pkcs9_rsa_private_key.pem  -inform PEM -outform PEM  -nocrypt
生成加密的私钥：openssl genrsa -aes256 -passout pass:123456 -out aes_rsa_private_key.pem 1024
通过加密私钥生成公钥：openssl rsa -in aes_rsa_private_key.pem -passin pass:123456 -pubout  -out rsa_public_key.pem