#!/bin/bash
# Download all images from Google
urls=(
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxMy0MXIsf4zPUak23Ku-Fh9ZLOY7n069Tg5jm4uElL85CyIHUWn38eqKwqHAkFHTIkc63qYVBwfsG06z-8Gd5cy26UwAQ-NZBRIxYRtvQJszL2fuhEPklLlNZCoxi9DxpOB7K-4w=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSza8g3VtZqpt1t2znlw79F64qcw9Q0tZ8elIuyMTCX_V97abQX-lKqTX4wO9Cg90ylTXWHrRq58NN8uU9Ya3ecfDvAU9Nibf34x1J-0Xy3Yto7y9ZmBgSjNU4KpckJ75bcN3EtFAw=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSziHbffLWyHIInKH7kxi-4aTlNCuUYU52NIi-kQCkiC4vs3zpHB7IW_YLnA22Sqk2iUukJYEADeWloCH26CE63E3khOD02wN-2qJ3l0IrM8F-y3EMKeTeyM0ISN262JcS3nMDOH=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyxYmzKgux3yHIPYRTqhpiC9GXuLSLKkwuGgR9JIkqyATqQBcnLXuxiYp7fcVhClfILooNyx5jxBe-B0yjGqr4sV5bqsYL_0XXEOW9ODubJIXKVClUQhKQhlTKRuWmX-aVnwohOAEoOIeNt=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSybrpVVhMOXYc0wk4lWaX6BOX7xots7MNKdbKjs7njFc_LPrQdVRMm7DJ7Yu4N5imXKtaq7kl_MobFD464JQvx1KlECZzq6PkwWn3dvVavvUqX-6mtUtKVcsC8ufMTEVFjqJxbNJUByF2VZ=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSweTPAS1o_EEzU4ZYRlD02hT1Z1tBj4stgUBKX50I88H_xBWIImRgkjJ_tbqHMQ8gytzUFR0_c5OJLGtOkxIgplQVWCPkwmaJR0RkYCoxyHyN5DEK5nIAkKIpdHC-IdmFNUKNHPzzY9oC2m=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzAFimmSzi_oMnj5z6IFzM0GRsUjL2rBqXCUoy452maTOQHkI090eKHJeaO0VC3yJQdlqIgTnRefVJsbW7qhEOzPmQK-_rKx-eE22w7Ov5mJsou8Z4Nxcy5jjtjtdyd6_TM4jHM=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwuK0jefzF6NfLA94Bq83hHuovlRyI7CSRf_d80wMcMnJLlCkKGL_AuCcfXrI76DoC1e0_Hn6M81SzYOULfnmjj15E1Hp6wcogWrBIIaVEYTk3vZR5Uj_Wv4vz1tqQUXXCk_IKDQpEWEYD2=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwCz68xHFgn1s73uOTqwDUEdyTagunKl88WOvbvQPqTEndjqx_25FvxbSipgW8HS4T5S-Cw-rPjefCN6eD0R3Q6XiF2Cn-guKSpsJ4l6_iMCej5m70-ABJ5MB9ykXyb3Ce1uZE=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzHNw7JXeJ12IPL3BDwud9OPnzHSJR8BnkiYtb8Y7tnPSY6QkontOzg8gkYEyDFPCSaaqupCY0QJGDMMANMlUHCtJaJpmEUsvmpBaTu_BV0zIRS4I5Kfp5Bhuw3tAmQJt8bmRQ=w1920-h1080-k-no"
)

for i in "${!urls[@]}"; do
  curl -s "${urls[$i]}" -o "gallery-$((i+1)).jpg"
  echo "Downloaded gallery-$((i+1)).jpg"
done
