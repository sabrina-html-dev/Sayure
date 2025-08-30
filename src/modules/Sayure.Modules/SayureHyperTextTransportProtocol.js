const Sayure = require('../Sayure.js');
const UserAgentCollection={
        hintsSupport:
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" |
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36,gzip(gfe)",
        Samsung_Galaxy_S25:
            "Mozilla/5.0 (Linux; Android 15; SM-S931B Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/127.0.6533.103 Mobile Safari/537.36" |
            "Mozilla/5.0 (Linux; Android 15; SM-S931U Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36",
        Samsung_Galaxy_S24_Ultra:
            'Mozila/5.0 (Linux; Android 14; SM-S928B/DS) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Mobile Safari/537.36'|
            "Mozila/5.0 (Linux; Android 14; SM-S928W) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Mobile Safari/537.36",
        Samsung_Flip:
            "Mozilla/5.0 (Linux; Android 14; SM-F9560 Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/127.0.6533.103 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 14; SM-F956U) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36",
        Samsung_Galaxy_Xcover7:
            "Mozilla/5.0 (Android 15; Mobile; SM-G556B/DS; rv:130.0) Gecko/130.0 Firefox/130.0"|
            "Mozilla/5.0 (Android 15; Mobile; SM-G556B; rv:130.0) Gecko/130.0 Firefox/130.0",
        Samsung_Galaxy_S23:
            "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36 Dalvik/2.1.0 (Linux; U; Android 13; SM-S911B Build/TP1A.220624.014)"|
            "Mozilla/5.0 (Linux; Android 13; SM-S911U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_S22_5G:
            "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 13; SM-S901U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_S22_Ultra_5G:
            "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 13; SM-S908U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_S21_5G:
            "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 13; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_S21_Ultra_5G:
            "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 13; SM-G998U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_A53_5G:
            "Mozilla/5.0 (Linux; Android 13; SM-A536B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_A51:
            "Mozilla/5.0 (Linux; Android 13; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 13; SM-A515U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Samsung_Galaxy_S10:
            "Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"|
            "Mozilla/5.0 (Linux; Android 12; SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Google_Pixel_9_Pro:
            "Mozilla/5.0 (Linux; Android 14; Pixel 9 Pro Build/AD1A.240418.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.54 Mobile Safari/537.36",
        Google_Pixel_9:
            "Mozilla/5.0 (Linux; Android 14; Pixel 9 Build/AD1A.240411.003.A5; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.54 Mobile Safari/537.36",
        Google_Pixel_8_Pro:
            "Mozilla/5.0 (Linux; Android 15; Pixel 8 Pro Build/AP4A.250105.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36",
        Google_Pixel_8:
            "Mozilla/5.0 (Linux; Android 15; Pixel 8 Build/AP4A.250105.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36",
        Google_Pixel_7_Pro:
            "Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Google_Pixel_7:
            "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Google_Pixel_6_Pro:
            "Mozilla/5.0 (Linux; Android 13; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Google_Pixel_6a:
            "Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Google_Pixel_6:
            "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Motorola_Moto_G:
            "Mozilla/5.0 (Linux; Android 15; moto g - 2025 Build/V1VK35.22-13-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36",
        Motorola_Moto_Edge_30_Neo:
            "Dalvik/2.1.0 (Linux; U; Android 15; moto edge 30 neo Build/AP3A.241105.008)",
        Motorola_Moto_g04:
            "Mozilla/5.0 (Linux; Android 14; Moto g04) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.64 Mobile Safari/537.36 Instabridge/22",
        Motorola_Moto_G_Stylus_5G:
            "Mozilla/5.0 (Linux; Android 14; moto g stylus 5G - 2024 Build/U2UB34.44-86; wv)",
        Motorola_Moto_G_Power_5G:
            "Mozilla/5.0 (Linux; Android 14; moto g power 5G - 2024 Build/U1UD34.16-62; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/123.0.6312.99 Mobile Safari/537.36",
        Motorola_Razr_50_Ultra:
            "Mozilla/5.0 (Linux; Android 14; motorola razr 50 ultra Build/U3UX34.56-29-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.134 Mobile Safari/537.36",
        Motorola_Moto_G_Pure:
            "Mozilla/5.0 (Linux; Android 12; moto g pure) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Motorola_Moto_G_Stylus_5G:
            "Mozilla/5.0 (Linux; Android 12; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36v",
        Motorola_Moto_G_Stylus_5G:
            "Mozilla/5.0 (Linux; Android 12; moto g stylus 5G (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Motorola_Moto_G_5G:
            "Mozilla/5.0 (Linux; Android 12; moto g 5G (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Motorola_Moto_G_Power:
            "Mozilla/5.0 (Linux; Android 12; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Motorola_Moto_G_Power:
            "Mozilla/5.0 (Linux; Android 11; moto g power (2021)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Redmi_Note_13_4G:
            "Mozilla/5.0 (Linux; Android 13; 23129RAA4G Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36",
        Redmi_Turbo_4:
            "Mozilla/5.0 (Linux; Android 15; 24129RT7CC Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.86 Mobile Safari/537.36",
        Huawei_Pura_70_Ultra:
            "Mozilla/5.0 (Linux; Android 12; HBP-LX9 Build/HUAWEIHBP-L29; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36",
        Huawei_Nova_12_Pro:
            "Mozilla/5.0 (Linux; U; Android 12; zh-Hans-CN; ADA-AL00 Build/HUAWEIADA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.58 Quark/6.11.2.531 Mobile Safari/537.36",
        Huawei_Nova_Flip:
            "Mozilla/5.0 (Linux; Android 12; PSD-AL00 Build/HUAWEIPSD-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36",
        Xiaomi_14_Ultra:
            "Mozilla/5.0 (Linux; Android 14; 24030PN60G Build/UKQ1.231003.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.119 Mobile Safari/537.36",
        Mix_Flip:
            "Mozilla/5.0 (Linux; Android 14; 2405CPX3DC Build/UKQ1.240116.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.193 Mobile Safari/537.36",
        Redmi_Note_9_Pro:
            "Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Redmi_Note_8_Pro:
            "Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Huawei_P30_Pro:
            "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Huawei_P30_lite:
            "Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Redmi_Note_10_Pro:
            "Mozilla/5.0 (Linux; Android 13; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Xiaomi_Poco_X3_Pro:
            'Mozilla/5.0 (Linux; Android 12; M2102J20SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        Redmi_Note_11_Pro_5G:
            "Mozilla/5.0 (Linux; Android 12; 2201116SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        OnePlus_Nord_N200_5G:
            "Mozilla/5.0 (Linux; Android 12; DE2118) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
        Apple_iPhone_16e:
            "Mozilla/5.0 (iPhone17,5; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 FireKeepers/1.7.0",
        Appl_iPhone_16_Pro:
            "Mozilla/5.0 (iPhone17,1; CPU iPhone OS 18_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Mohegan Sun/4.7.4",
        Apple_iPhone_16_Pro_Max:
            "Mozilla/5.0 (iPhone17,2; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Resorts/4.5.2",
        Apple_iPhone_16:
            "Mozilla/5.0 (iPhone17,3; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 FireKeepers/1.6.1",
        Apple_iPhone_16_Plus:
            "Mozilla/5.0 (iPhone17,4; CPU iPhone OS 18_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Resorts/4.7.5",
        Apple_iPhone_15_Pro:
            "Mozilla/5.0 (iPhone16,2; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Resorts/4.7.5",
        Apple_iPhone_14:
            "Mozilla/5.0 (iPhone14,7; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Mohegan Sun/4.7.3",
        Apple_iPhone_13_Pro:
            "Mozilla/5.0 (iPhone14,2; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Mohegan Sun/4.7.4",
        Apple_iPhone_SE_3rd_generation:
            "Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1",
        iPhone_13_Pro_Max:
            "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1",
        iPhone_12:
            "Mozilla/5.0 (iPhone13,2; U; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
        iPhone_11:
            "Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
        iPhone_11:
            "Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
        Apple_iPhone_XR_Safari:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
        Apple_iPhone_XS_Chrome:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1",
        Apple_iPhone_XS_Max_Firefox:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15",
        Apple_iPhone_X:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
        Apple_iPhone_8:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
        Apple_iPhone_8_Plus:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A5370a Safari/604.1",
        Apple_iPhone_7:
            "Mozilla/5.0 (iPhone9,3; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1",
        Apple_iPhone_7_Plus:
            "Mozilla/5.0 (iPhone9,4; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1",
        Apple_iPhone_6:
            "Mozilla/5.0 (Apple-iPhone7C2/1202.466; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3",
        Microsoft_Lumia_650:
            "Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; RM-1152) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254",
        Microsoft_Lumia_550:
            "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; RM-1127_16056) AppleWebKit/537.36(KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10536",
        Microsoft_Lumia_950:
            "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.1058",
        Apple_iPad_Pro:
            "Mozilla/5.0 (iPad16,3; CPU OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Tropicana_NJ/5.7.1",
        Samsung_Galaxy_Tab_Active5_5G:
            "Dalvik/2.1.0 (Linux; U; Android 14; SM-X306B Build/UP1A.231005.007)",
        Samsung_Galaxy_Tab_S6_Lite:
            "Dalvik/2.1.0 (Linux; U; Android 14; SM-P619N Build/UP1A.231005.007)",
        Xiaomi_Pad_7_Pro:
            "Dalvik/2.1.0 (Linux; U; Android 15; 24091RPADG Build/AQ3A.240801.002)",
        Amazon_Fire_HD_8_2024_12th_Gen:
            "Dalvik/2.1.0 (Linux; U; Android 11; KFRASWI Build/RS8332.3115N)",
        Samsung_Galaxy_Tab_S6_Lite:
            "Dalvik/2.1.0 (Linux; U; Android 14; SM-P619N Build/UP1A.231005.007)",
        Lenovo_Tab_M10a_5G:
            "Dalvik/2.1.0 (Linux; U; Android 13; LET02 Build/TKQ1.230127.002)",
        Apple_iPad_Air_11_M3:
            "Mozilla/5.0 (iPad15,3; CPU OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Resorts/4.7.5",
        Samsung_Galaxy_Tab_S8_Ultra:
            "Mozilla/5.0 (Linux; Android 12; SM-X906C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36",
        Lenovo_Yoga_Tab_11:
            "Mozilla/5.0 (Linux; Android 11; Lenovo YT-J706X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        Google_Pixel_C:
            "Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36",
        Sony_Xperia_Z4_Tablet:
            "Mozilla/5.0 (Linux; Android 6.0.1; SGP771 Build/32.2.A.0.253; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36",
        Nvidia_Shield_Tablet_K1:
            "Mozilla/5.0 (Linux; Android 6.0.1; SHIELD Tablet K1 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Safari/537.36",
        Samsung_Galaxy_Tab_S3:
            "Mozilla/5.0 (Linux; Android 7.0; SM-T827R4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Safari/537.36",
        Samsung_Galaxy_Tab_A:
            "Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-T550 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.3 Chrome/38.0.2125.102 Safari/537.36",
        Amazon_Kindle_Fire_HDX_7:
            "Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/47.1.79 like Chrome/47.0.2526.80 Safari/537.36",
        LG_G_Pad_7_0:
            "Mozilla/5.0 (Linux; Android 5.0.2; LG-V410/V41020c Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/34.0.1847.118 Safari/537.36",
        Windows_10_based_PC_using_Edge_browser:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
        Chrome_OS_based_laptop_using_Chrome_browser:
            "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        Mac_OS_X_based_computer_using_a_Safari_browser:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15",
        Windows_7_based_PC_using_a_Chrome_browser:
            "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36>",
        Linux_based_PC_using_a_Firefox_browser:
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1",
        Amazon_Fire_TV_Stick_4K_Max:
            "Mozilla/5.0 (Linux; Android 11; AFTKRT Build/RS8101.1849N; wv)PlexTV/10.0.0.4149",
        Amazon_Fire_TV_Cube:
            "Mozilla/5.0 (Linux; Android 9; AFTGAZL Build/PS7607.3166N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5005.125 Mobile Safari/537.36 FE v1.79.1",
        Doom_Pro_5G:
            "Mozilla/5.0 (Linux; Android 14; DOOM PRO 5G Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Safari/537.36 FE v1.87.3",
        Apple_TV:
            "AppleTV14,1/16.1",
        Minix_NEO_X39:
            "Mozilla/5.0 (Linux; Android 7.1.2; NEO_X39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Safari/537.36",
        Amazon_Fire_TV_Stick_4K_Max:
            "Mozilla/5.0 (Linux; Android 9; AFTKA) AppleWebKit/537.36 (KHTML, like Gecko) Silk/92.2.11 like Chrome/92.0.4515.159 Safari/537.36",
        Amazon_Fire_TV_Cube:
            "Mozilla/5.0 (Linux; Android 9; AFTR) AppleWebKit/537.36 (KHTML, like Gecko) Silk/98.6.10 like Chrome/98.0.4758.136 Safari/537.36",
        Google_ADT_2:
            "Dalvik/2.1.0 (Linux; U; Android 9; ADT-2 Build/PTT5.181126.002)",
        Chromecast:
            "Mozilla/5.0 (CrKey armv7l 1.5.16041) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.0 Safari/537.36",
        Roku_Ultra:
            "Roku4640X/DVP-7.70 (297.70E04154A)",
        Minix_NEO_X5:
            "Mozilla/5.0 (Linux; U; Android 4.2.2; he-il; NEO-X5-116A Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
        Amazon_AFTWMST22:
            "Mozilla/5.0 (Linux; Android 9; AFTWMST22 Build/PS7233; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.152 Mobile Safari/537.36",
        Amazon_4K_Fire_TV:
            "Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36",
        Google_Nexus_Player:
            "Dalvik/2.1.0 (Linux; U; Android 6.0.1; Nexus Player Build/MMB29T)",
        Apple_TV_6th_Gen_4K:
            "AppleTV11,1/11.1",
        Apple_TV_5th_Gen_4K:
            "AppleTV6,2/11.1",
        Apple_TV_4th_Gen:
            "AppleTV5,3/9.1.1",
        Playstation_5:
            "Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15",
        Playstation_4:
            "Mozilla/5.0 (PlayStation 4 3.11) AppleWebKit/537.73 (KHTML, like Gecko)",
        Playstation_Vita:
            "Mozilla/5.0 (PlayStation Vita 3.61) AppleWebKit/537.73 (KHTML, like Gecko) Silk/3.2",
        Xbox_Series_X:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36 Edge/20.02",
        Xbox_One_S:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; XBOX_ONE_ED) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
        Xbox_One:
            "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586",
        Nintendo_Switch:
            "Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.5.10 NintendoBrowser/5.1.0.13343",
        Nintendo_Wii_U:
            "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.30 (KHTML, like Gecko) NX/3.0.4.2.12 NintendoBrowser/4.3.1.11264.US",
        Nintendo_3DS:
            "Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7412.EU",
        Facebook_bot:
            "Mozilla/5.0 (compatible; FacebookBot/1.0; +https://developers.facebook.com/docs/sharing/webmasters/facebookbot/)",
        OpenAI_Search_bot:
            "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
        ChatGPT:
            "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
        Google_bot:
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Bing_bot:
            "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
        Yahoo_bot:
            "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
        Amazon_Kindle_4:
            "Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+",
        Amazon_Kindle_3:
            "Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600x800; rotate)",
        Onyx_Note_Air_3C:
            "Dalvik/2.1.0 (Linux; U; Android 12; NoteAir3C Build/2023-11-15_15-07_3.5_0a296ec2c)"
    }
const StandardRequestFields={
    /**
     * @name A-IM
     * @description Acceptable instance-manipulations for the request.
     * @type {string}
     * @eg A-IM: feed
     * @status Permanent
     * @standard RFC 3229
     * @returns {string}
    */
    "A-IM":"",
    /**
     * @name Accept
     * @description Media type(s) that is/are acceptable for the response. See Content negotiation.
     * @type {string}
     * @eg Accept: text/html
     * @status Permanent
     * @standard RFC 9110
     * @see textHTML {@link https://www.w3schools.com/html/html_formatting.asp}
     * @see application/xhtml+xml {@link https://www.iana.org/assignments/media-types/application/xhtml+xml}
     * @returns {string}
    */
    Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    /**
     * @name Accept-Charset
     * @description Character sets that are acceptable.
     * @type {string}
     * @eg Accept-Charset: utf-8
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Accept-Charset':'utf-8, iso-8859-1, utf-16, *;q=0.7',
    /**
     * @name Accept-Datetime
     * @description Acceptable version in time.
     * @type {string}
     * @eg Accept-Datetime: Thu, 31 May 2007 20:35:00 GMT
     * @status Provisional
     * @standard RFC 7089
     * @returns {string}
    */
    "Accept-Datetime":'',
    /**
     * @name Accept-Encoding
     * @description List of acceptable encodings. See HTTP compression.
     * @type {string}
     * @eg Accept-Encoding: gzip, deflate
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    "Accept-Encoding":'gzip, deflate, br',
    /**
     * @name Accept-Language
     * @description List of acceptable human languages for response. See Content negotiation.
     * @type {string}
     * @eg Accept-Language: en-US
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Accept-Language':"cs-CZ,cs;q=0.9",
    /**
     * @name Access-Control-Request-Method
     * @description 
     * @type {string}
     * @eg 
     * @status 
     * @standard RFC 
     * @returns {string}
    */
    "Access-Control-Request-Method":null,
    /**
     * @name Access-Control-Request-Headers
     * @description Initiates a request for cross-origin resource sharing with Origin (below).
     * @type {string}
     * @eg Access-Control-Request-Method: GET
     * @status Permanent: standard 
     * @standard RFC 
     * @returns {string}
    */
    'Access-Control-Request-Headers':'',
    /**
     * @name Authorization
     * @description Authentication credentials for HTTP authentication.
     * @type {string}
     * @eg Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Authorization:"Basic aHJiOmFydA==",
    /**
     * @name Cache-Control
     * @description Used to specify directives that must be obeyed by all caching mechanisms along the request-response chain.
     * @type {string}
     * @eg Cache-Control: no-cache
     * @status Permanent
     * @standard RFC 9111
     * @returns {string}
    */
    'Cache-Control':'',
    /**
     * @name Connection
     * @description Control options for the current connection and list of hop-by-hop request fields.
     * Must not be used with HTTP/2. {@link Connection: keep-alive}
     * @type {string}
     * @eg Connection: Upgrade
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Connection:'',
    /**
     * @name Content-Encoding
     * @description The type of encoding used on the data. See HTTP compression.
     * @type {string}
     * @eg Content-Encoding: gzip
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Encoding':'',
    /**
     * @name Content-Length
     * @description The length of the request body in octets (8-bit bytes).
     * @type {string}
     * @eg Content-Length: 348
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Length':'',
    /**
     * @name Content-MD5
     * @description A Base64-encoded binary MD5 sum of the content of the request body.
     * @type {string}
     * @eg Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==
     * @status Obsolete
     * @standard RFC 1544, 1864, 4021
     * @returns {string}
    */
    'Content-MD5':'',
    /**
     * @name Content-Type
     * @description The Media type of the body of the request (used with POST and PUT requests).
     * @type {string}
     * @eg Content-Type: application/x-www-form-urlencoded
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Type':'',
    /**
     * @name Cookie
     * @description An HTTP cookie previously sent by the server with Set-Cookie (below).
     * @type {string}
     * @eg Cookie: $Version=1; Skin=new;
     * @status Permanent: standard
     * @standard RFC 2965, 6265
     * @returns {string}
    */
    Cookie:'',
    /**
     * @name Connection
     * @description The date and time at which the message was originated (in "HTTP-date" format as defined by RFC 9110: HTTP Semantics, section 5.6.7 "Date/Time Formats").
     * @type {string}
     * @eg Date: Tue, 15 Nov 1994 08:12:31 GMT
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Date:'',
    /**
     * @name Connection
     * @description Indicates that particular server behaviors are required by the client.
     * @type {string}
     * @eg Expect: 100-continue
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Expect:'',
    /**
     * @name Forwarded
     * @description Disclose original information of a client connecting to a web server through an HTTP proxy.
     * @type {string}
     * @eg Forwarded: for=192.0.2.60;proto=http;by=203.0.113.43 Forwarded: for=192.0.2.43, for=198.51.100.17
     * @status Permanent
     * @standard RFC 7239
     * @returns {string}
    */
    Forwarded:'',
    /**
     * @name From
     * @description The email address of the user making the request.
     * @type {string}
     * @eg From: user@example.com
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    From:"",
    /**
     * @name Host
     * @description The domain name of the server (for virtual hosting), and the TCP port number on which the server is listening. The port number may be omitted if the port is the standard port for the service requested.
     * Mandatory since HTTP/1.1.[17] If the request is generated directly in HTTP/2, it should not be used.
     * Host: en.wikipedia.org:8080
     * @type {string}
     * @eg Connection: Upgrade
     * @status Permanent
     * @standard RFC 9110, 9113
     * @returns {string}
    */
    Host:"",
    /**
     * @name HTTP2-Settings
     * @description A request that upgrades from HTTP/1.1 to HTTP/2 MUST include exactly one HTTP2-Settings header field. The HTTP2-Settings header field is a connection-specific header field that includes parameters that govern the HTTP/2 connection, provided in anticipation of the server accepting the request to upgrade.
     * @type {string}
     * @eg HTTP2-Settings: token64
     * @status Obsolete
     * @standard RFC 7540, 9113
     * @returns {string}
    */
    'HTTP2-Settings':'',
    /**
     * @name If-Match
     * @description Only perform the action if the client supplied entity matches the same entity on the server. This is mainly for methods like PUT to only update a resource if it has not been modified since the user last updated it.
     * @type {string}
     * @eg If-Match: "737060cd8c284d8af7ad3082f209582d"
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'If-Match':'',
    /**
     * @name If-Modified-Since
     * @description Allows a 304 Not Modified to be returned if content is unchanged.
     * @type {string}
     * @eg If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'If-Modified-Since':'',
    /**
     * @name If-None-Match
     * @description Allows a 304 Not Modified to be returned if content is unchanged, see HTTP ETag.
     * @type {string}
     * @eg If-None-Match: "737060cd8c284d8af7ad3082f209582d"
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'If-None-Match':'',
    /**
     * @name If-Range
     * @description If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity.
     * @type {string}
     * @eg If-Range: "737060cd8c284d8af7ad3082f209582d"
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'If-Range':'',
    /**
     * @name If-Unmodified-Since
     * @description Only send the response if the entity has not been modified since a specific time.
     * @type {string}
     * @eg If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'If-Unmodified-Since':'',
    /**
     * @name Max-Forwards
     * @description Limit the number of times the message can be forwarded through proxies or gateways.
     * @type {string}
     * @eg Max-Forwards: 10
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Max-Forwards':'',
    /**
     * @name Origin
     * @description Initiates a request for cross-origin resource sharing (asks server for Access-Control-* response fields).
     * @type {string}
     * @eg Origin: http://www.example-social-network.com
     * @status Permanent: standard
     * @standard RFC 6454
     * @returns {string}
    */
    Origin:'',
    /**
     * @name Pragma
     * @description Implementation-specific fields that may have various effects anywhere along the request-response chain.
     * @type {string}
     * @eg Pragma: no-cache
     * @status Outdated
     * @standard RFC 9111
     * @returns {string}
    */
    Pragma:'',
    /**
     * @name Prefer
     * @description Allows client to request that certain behaviors be employed by a server while processing a request.
     * @type {string}
     * @eg Prefer: return=representation
     * @status Permanent
     * @standard RFC 7240
     * @returns {string}
    */
    Prefer:'',
    /**
     * @name Proxy-Authorization
     * @description Authorization credentials for connecting to a proxy.
     * @type {string}
     * @eg Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Proxy-Authorization':'',
    /**
     * @name Range
     * @description Request only part of an entity. Bytes are numbered from 0. See Byte serving.
     * @type {string}
     * @eg Range: bytes=500-999
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Range:'',
    /**
     * @name Referer
     * @description This is the address of the previous web page from which a link to the currently requested page was followed. (The word "referrer" has been misspelled in the RFC as well as in most implementations to the point that it has become standard usage and is considered correct terminology.)
     * @type {string}
     * @eg Referer: http://en.wikipedia.org/wiki/Main_Page
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Referer:'',
    /**
     * @name TE
     * @description The transfer encodings the user agent is willing to accept: the same values as for the response header field Transfer-Encoding can be used, plus the "trailers" value (related to the "chunked" transfer method) to notify the server it expects to receive additional fields in the trailer after the last, zero-sized, chunk. Only trailers is supported in HTTP/2.
     * @type {string}
     * @eg TE: trailers, deflate
     * @status Permanent
     * @standard RFC 9110, 9113
     * @returns {string}
    */
    TE:'',
    /**
     * @name Trailer
     * @description The Trailer general field value indicates that the given set of header fields is present in the trailer of a message encoded with chunked transfer coding.
     * @type {string}
     * @eg Trailer: Max-Forwards
     * @status Permanent
     * @standard RFC 9110, 9113
     * @returns {string}
    */
    Trailer:'',
    /**
     * @name Transfer-Encoding
     * @description The form of encoding used to safely transfer the entity to the user. Currently defined methods are: chunked, compress, deflate, gzip, identity. Must not be used with HTTP/2.
     * @type {string}
     * @eg Transfer-Encoding: chunked
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Transfer-Encoding':'',
    /**
     * @name User-Agent
     * @description The user agent string of the user agent
     * @type {string}
     * @eg User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'User-Agent':'',
    /**
     * @name Upgrade
     * @description Ask the server to upgrade to another protocol. Must not be used in HTTP/2.
     * @type {string}
     * @eg Upgrade: h2c, HTTPS/1.3, IRC/6.9, RTA/x11, websocket
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Upgrade:'',
    /**
     * @name Via
     * @description Informs the server of proxies through which the request was sent.
     * @type {string}
     * @eg Via: 1.0 fred, 1.1 example.com (Apache/1.1)
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Via:'',
    /**
     * @name Warning
     * @description A general warning about possible problems with the entity body.
     * @type {string}
     * @eg Warning: 199 Miscellaneous warning
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Warning:''
    }
const CommonNonStandardRequestFields={
    /**
     * @name Upgrade-Insecure-Requests
     * @description Tells a server which (presumably in the middle of a HTTP -> HTTPS migration) hosts mixed content that the client would prefer redirection to HTTPS and can handle Content-Security-Policy: upgrade-insecure-requests
     * @type {string}
     * @eg Upgrade-Insecure-Requests: 1
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Upgrade-Insecure-Requests':'',
    /**
     * @name X-Requested-With
     * @description Mainly used to identify Ajax requests (most JavaScript frameworks send this field with value of XMLHttpRequest); also identifies Android apps using WebView
     * @type {string}
     * @eg X-Requested-With: XMLHttpRequest
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-Requested-With':'',
    /**
     * @name DNT
     * @description Requests a web application to disable their tracking of a user. This is Mozilla's version of the X-Do-Not-Track header field (since Firefox 4.0 Beta 11). Safari and IE9 also have support for this field.[25] On March 7, 2011, a draft proposal was submitted to IETF. The W3C Tracking Protection Working Group is producing a specification.
     * @type {string}
     * @eg DNT: 1 (Do Not Track Enabled)
     * @eg DNT: 0 (Do Not Track Disabled)
     * ```sh
     * DNI: 1
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    DNT:'', 	
    /**
     * @name X-Forwarded-For
     * @description A de facto standard for identifying the originating IP address of a client connecting to a web server through an HTTP proxy or load balancer. Superseded by Forwarded header.
     * @type {string}
     * @eg X-Forwarded-For: client1, proxy1, proxy2
     * @eg X-Forwarded-For: 129.78.138.66, 129.78.64.103
     * ```sh
     * X-Forwarded-For: 129.78.138.66, 129.78.64.103
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-Forwarded-For':'', 	
    /**
     * @name X-Forwarded-Host
     * @description A de facto standard for identifying the original host requested by the client in the Host HTTP request header, since the host name and/or port of the reverse proxy (load balancer) may differ from the origin server handling the request. Superseded by Forwarded header.
     * @type {string}
     * @eg X-Forwarded-Host: en.wikipedia.org
     * @eg X-Forwarded-Host: en.wikipedia.org:8080
     * ```sh
     * X-Forwarded-Host: en.wikipedia.org:8080
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-Forwarded-Host':'', 	
    /**
     * @name X-Forwarded-Proto
     * @description A de facto standard for identifying the originating protocol of an HTTP request, since a reverse proxy (or a load balancer) may communicate with a web server using HTTP even if the request to the reverse proxy is HTTPS. An alternative form of the header (X-ProxyUser-Ip) is used by Google clients talking to Google servers. Superseded by Forwarded header.
     * @type {string}
     * @eg X-Forwarded-Proto: https
     * @eg X-Forwarded-Proto: https
     * ```sh
     * X-Forwarded-Proto: https
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-Forwarded-Proto':'',
    /**
     * @name Front-End-Https
     * @description Non-standard header field used by Microsoft applications and load-balancers
     * @type {string}
     * @eg Front-End-Https: on
     * @eg Front-End-Https: on
     * ```sh
     * Front-End-Https: on
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Front-End-Https':'',
    /**
     * @name X-Http-Method-Override
     * @description Requests a web application to override the method specified in the request (typically POST) with the method given in the header field (typically PUT or DELETE). This can be used when a user agent or firewall prevents PUT or DELETE methods from being sent directly (this is either a bug in the software component, which ought to be fixed, or an intentional configuration, in which case bypassing it may be the wrong thing to do).
     * @type {string}
     * @eg X-HTTP-Method-Override: DELETE
     * @eg X-HTTP-Method-Override: DELETE
     * ```sh
     * X-HTTP-Method-Override: DELETE
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-Http-Method-Override':'',
    /**
     * @name X-Att-Deviceid
     * @description Allows easier parsing of the MakeModel/Firmware that is usually found in the User-Agent String of AT&T Devices
     * @type {string}
     * @eg X-Att-Deviceid: GT-P7320/P7320XXLPG
     * @eg X-Att-Deviceid: GT-P7320/P7320XXLPG
     * ```sh
     * X-Att-Deviceid: GT-P7320/P7320XXLPG
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-ATT-DeviceId':'',
    /**
     * @name X-Wap-Profile
     * @description Links to an XML file on the Internet with a full description and details about the device currently connecting. In the example to the right is an XML file for an AT&T Samsung Galaxy S2.
     * @type {string}
     * @eg x-wap-profile: http://wap.samsungmobile.com/uaprof/SGH-I777.xml
     * @eg x-wap-profile: http://wap.samsungmobile.com/uaprof/SGH-I777.xml
     * ```sh
     * x-wap-profile: http://wap.samsungmobile.com/uaprof/SGH-I777.xml
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'X-Wap-Profile':'',
    /**
     * @name Proxy-Connection
     * @description Implemented as a misunderstanding of the HTTP specifications. Common because of mistakes in implementations of early HTTP versions. Has exactly the same functionality as standard Connection field. Must not be used with HTTP/2.
     * @type {string}
     * @eg Proxy-Connection: keep-alive
     * @eg Proxy-Connection: keep-alive
     * ```sh
     * Proxy-Connection: keep-alive
     * ```
     * @status Permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Proxy-Connection':'',
    'X-UIDH':'',// 	Server-side deep packet inspection of a unique ID identifying customers of Verizon Wireless; also known as "perma-cookie" or "supercookie" 	X-UIDH: ...
    'X-Csrf-Token':'',// 	Used to prevent cross-site request forgery. Alternative header names are: X-CSRFToken[40] and X-XSRF-TOKEN[41] 	X-Csrf-Token: i8XNjC4b8KVok4uw5RftR38Wgp2BFwql
    'X-Request-ID':'',//
    'X-Correlation-ID':'',// Correlation-ID, Correlates HTTP requests between a client and server. Superseded by the traceparent header.	        X-Request-ID: f058ebd6-02f7-4d3f-942e-904344e8cde5
    'Save-Data':'',// 	The Save-Data client hint request header available in Chrome, Opera, and Yandex browsers lets developers deliver lighter, faster applications to users who opt-in to data saving mode in their browser. 	Save-Data: on
    'Sec-GPC':'',// 	The Sec-GPC (Global Privacy Control[broken anchor]) request header indicates whether the user consents to a website or service selling or sharing their personal information with third parties. 	Sec-GPC: 1
    }
const StandardResponseFields = {
    /**
     * @name Accept-CH
     * @description Requests HTTP Client Hints
     * @type {string}
     * @eg Accept-CH: UA, Platform
     * @status experimental
     * @standard RFC 8948
     * @returns {string}
    */
    'Accept-CH': '',
    /**
     * @description Specifying which web sites can participate in cross-origin resource sharing
     * @type {string}
     * @eg Access-Control-Allow-Origin: *
     * @status experimental
     * @standard RFC 7480
     * @returns {string}
    */
    "Access-Control-Allow-Origin":'',
    /**
     * @description Specifying which web sites can participate in cross-origin resource sharing
     * @type {string}
     * @eg Access-Control-Allow-Origin: *
     * @status permanent: standart
     * @standard RFC 7480
     * @returns {string}
    */
    'Access-Control-Allow-Credentials':'',
    /**
     * @description Specifying which web sites can participate in cross-origin resource sharing
     * @type {string}
     * @eg Access-Control-Allow-Origin: *
     * @status permanent: standart
     * @standard RFC 7480
     * @returns {string}
    */
    'Access-Control-Expose-Headers':'',
    /**
     * @description Specifying which web sites can participate in cross-origin resource sharing
     * @type {string}
     * @eg Access-Control-Allow-Origin: *
     * @status permanent: standart
     * @standard RFC 7480
     * @returns {string}
    */
    'Access-Control-Max-Age':'',
    /**
     * @description Specifying which web sites can participate in cross-origin resource sharing
     * @type {string}
     * @eg Access-Control-Allow-Origin: *
     * @status permanent: standart
     * @standard RFC 7480
     * @returns {string}
    */
    'Access-Control-Allow-Methods':'',
    /**
     * @description Specifying which web sites can participate in cross-origin resource sharing
     * @type {string}
     * @eg Access-Control-Allow-Origin: *
     * @status permanent: standart
     * @standard RFC 7480
     * @returns {string}
    */
    'Access-Control-Allow-Headers':'',
    /**
     * @description Specifies which patch document formats this server supports
     * @type {string}
     * @eg Accept-Patch: text/example;charset=utf-8
     * @status permanent
     * @standard RFC 5789
     * @returns {string}
    */
    'Accept-Patch':'',
    /**
     * @description What partial content range types this server supports via byte serving
     * @type {string}
     * @eg Accept-Ranges: bytes
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Accept-Ranges':'',
    /**
     * @description The age the object has been in a proxy cache in seconds
     * @type {string}
     * @eg Age: 12
     * @status permanent
     * @standard RFC 9111
     * @returns {string}
    */
    Age: '',
    /**
     * @description Valid methods for a specified resource. To be used for a 405 Method not allowed
     * @type {string}
     * @eg Allow: GET, HEAD
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Allow: '',
    /**
     * @description A server uses "Alt-Svc" header (meaning Alternative Services) to indicate that its resources can also be accessed at a different network location (host or port) or using a different protocol. When using HTTP/2, servers should instead send an ALTSVC frame.
     * @type {string}
     * @eg Alt-Svc: http/1.1="http2.example.com:8001"; ma=7200
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Alt-Svc': '',
    /**
     * @description Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds
     * @type {string}
     * @eg Cache-Control: max-age=3600
     * @status permanent
     * @standard RFC 9111
     * @returns {string}
    */
    'Cache-Control':'',
    /**
     * @description Control options for the current connection and list of hop-by-hop response fields.   Must not be used with HTTP/2.
     * @type {string}
     * @eg Connection: close
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Connection:'',
    /**
     * @description An opportunity to raise a "File Download" dialogue box for a known MIME type with binary format or suggest a filename for dynamic content. Quotes are necessary with special characters.
     * @type {string}
     * @eg Content-Disposition: attachment; filename="fname.ext"
     * @status permanent
     * @standard RFC 2616, 4021, 6266
     * @returns {string}
    */
    'Content-Disposition':'',
    /**
     * @description The type of encoding used on the data. See HTTP compression.
     * @type {string}
     * @eg Content-Encoding: gzip
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Encoding':'',
    /**
     * @description The natural language or languages of the intended audience for the enclosed content.
     * @type {string}
     * @eg Content-Language: da
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Language':'',
    /**
     * @description The length of the response body in octets (8-bit bytes)
     * @type {string}
     * @eg Content-Length: 348
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Length':'',
    /**
     * @description An alternate location for the returned data
     * @type {string}
     * @eg Content-Location: /index.htm
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Location':'',
    /**
     * @description A Base64-encoded binary MD5 sum of the content of the response
     * @type {string}
     * @eg Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==
     * @status Obsolete
     * @standard RFC 1544, 1864, 4021
     * @deprecated
     * @returns {string}
    */
    'Content-MD5':'',
    /**
     * @description Where in a full body message this partial message belongs
     * @type {string}
     * @eg Content-Range: bytes 21010-47021/47022
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Range':'',
    /**
     * @description The MIME type of this content
     * @type {string}
     * @eg Content-Type: text/html; charset=utf-8
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Content-Type':'',
    /**
     * @description The date and time that the message was sent (in "HTTP-date" format as defined by RFC 9110)
     * @type {string}
     * @eg Date: Tue, 15 Nov 1994 08:12:31 GMT
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Date:'',
    /**
     * @description Specifies the delta-encoding entity tag of the response.
     * @type {string}
     * @eg Delta-Base: "abc"
     * @status permanent
     * @standard RFC 3229
     * @returns {string}
    */
    'Delta-Base':'',
    /**
     * @description An identifier for a specific version of a resource, often a message digest
     * @type {string}
     * @eg ETag: "737060cd8c284d8af7ad3082f209582d"
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    ETag:'',
    /**
     * @description Gives the date/time after which the response is considered stale (in "HTTP-date" format as defined by RFC 9110)
     * @type {string}
     * @eg Expires: Thu, 01 Dec 1994 16:00:00 GMT
     * @status Permanent: standard
     * @standard RFC 9111
     * @returns {string}
    */
    Expires:'',
    /**
     * @description Instance-manipulations applied to the response.
     * @type {string}
     * @eg IM: feed
     * @status permanent
     * @standard RFC 3229
     * @returns {string}
    */
    IM:'',
    /**
     * @description The last modified date for the requested object (in "HTTP-date" format as defined by RFC 9110)
     * @type {string}
     * @eg Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    'Last-Modified':'',
    /**
     * @description Used to express a typed relationship with another resource, where the relation type is defined by RFC 8288
     * @type {string}
     * @eg Link: </feed>; rel="alternate"
     * @status permanent
     * @standard RFC 8288
     * @returns {string}
    */
    Link:'',
    /**
     * @description Used in redirection, or when a new resource has been created.
     * @type {string}
     * @eg Location: http://www.w3.org/pub/WWW/People.html ou Location: /pub/WWW/People.html
     * @status permanent
     * @standard RFC 9110
     * @returns {string}
    */
    Location:'',
    'P3P':'',// 	This field is supposed to set P3P policy, in the form of P3P:CP="your_compact_policy". However, P3P did not take off,[54] most browsers have never fully implemented it, a lot of websites set this field with fake policy text, that was enough to fool browsers the existence of P3P policy and grant permissions for third party cookies. 	P3P: CP="This is not a P3P policy! See https://en.wikipedia.org/wiki/Special:CentralAutoLogin/P3P for more info." 	Permanent 	
    'Pragma':'',// 	Implementation-specific fields that may have various effects anywhere along the request-response chain. 	Pragma: no-cache 	Permanent 	RFC 9111
    'Preference-Applied':'',// 	Indicates which Prefer tokens were honored by the server and applied to the processing of the request. 	Preference-Applied: return=representation 	Permanent 	RFC 7240
    'Proxy-Authenticate':'',// 	Request authentication to access the proxy. 	Proxy-Authenticate: Basic 	Permanent 	RFC 9110
    'Public-Key-Pins':'',//[55] 	HTTP Public Key Pinning, announces hash of website's authentic TLS certificate 	Public-Key-Pins: max-age=2592000; pin-sha256="E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g="; 	Permanent 	RFC 7469
    'Retry-After':'',// 	If an entity is temporarily unavailable, this instructs the client to try again later. Value could be a specified period of time (in seconds) or a HTTP-date.[56] 	
    //    Example 1: Retry-After: 120
    //    Example 2: Retry-After: Fri, 07 Nov 2014 23:59:59 GMT
    //Permanent
    //	RFC 9110
    'Server':'',// 	A name for the server 	Server: Apache/2.4.1 (Unix) 	Permanent 	RFC 9110
    'Set-Cookie':'',// 	An HTTP cookie 	Set-Cookie: CookieName=CookieValue; Max-Age=3600; Version=1 	Permanent: standard 	RFC 6265
    'Strict-Transport-Security':'',// 	A HSTS Policy informing the HTTP client how long to cache the HTTPS only policy and whether this applies to subdomains. 	Strict-Transport-Security: max-age=16070400; includeSubDomains 	Permanent: standard 	
    'Trailer':'',// 	The Trailer general field value indicates that the given set of header fields is present in the trailer of a message encoded with chunked transfer coding. 	Trailer: Max-Forwards 	Permanent 	RFC 9110
    'Transfer-Encoding':'',// 	The form of encoding used to safely transfer the entity to the user. Currently defined methods are: chunked, compress, deflate, gzip, identity.
    //Must not be used with HTTP/2.[14]
    //	Transfer-Encoding: chunked 	Permanent 	RFC 9110
    Tk:'',// 	Tracking Status header, value suggested to be sent in response to a DNT(do-not-track), possible values:
    //"!" — under construction
    //"?" — dynamic
    //"G" — gateway to multiple parties
    //"N" — not tracking
    //"T" — tracking
    //"C" — tracking with consent
    //"P" — tracking only if consented
    //"D" — disregarding DNT
    //"U" — updated
    //	Tk: ? 	Permanent 	
    Upgrade:'',// 	Ask the client to upgrade to another protocol.
    //Must not be used in HTTP/2[14]
    //	Upgrade: h2c, HTTPS/1.3, IRC/6.9, RTA/x11, websocket 	Permanent 	RFC 9110
    Vary:'',// 	Tells downstream proxies how to match future request headers to decide whether the cached response can be used rather than requesting a fresh one from the origin server. 	
    //    Example 1: Vary: *
    //    Example 2: Vary: Accept-Language
    //	Permanent 	RFC 9110
    Via:'',// 	Informs the client of proxies through which the response was sent. 	Via: 1.0 fred, 1.1 example.com (Apache/1.1) 	Permanent 	RFC 9110
    Warning:'',// 	A general warning about possible problems with the entity body. 	Warning: 199 Miscellaneous warning 	Obsolete[21] 	RFC 7234, 9111
    'WWW-Authenticate':'',// 	Indicates the authentication scheme that should be used to access the requested entity. 	WWW-Authenticate: Basic 	Permanent 	RFC 9110
    'X-Frame-Options':'',// 	Clickjacking protection: deny - no rendering within a frame, sameorigin - no rendering if origin mismatch, allow-from - allow from specified location, allowall - non-standard, allow from any location 	X-Frame-Options: deny
    }
const CommonNonStandardResponseFields={
        /*
        Content-Security-Policy,
        X-Content-Security-Policy,
        X-WebKit-CSP 	Content Security Policy definition. 	X-WebKit-CSP: default-src 'self'
        Expect-CT 	Notify to prefer to enforce Certificate Transparency. 	Expect-CT: max-age=604800, enforce, report-uri="https://example.example/report"
        NEL 	Used to configure network request logging. 	NEL: { "report_to": "name_of_reporting_group", "max_age": 12345, "include_subdomains": false, "success_fraction": 0.0, "failure_fraction": 1.0 }
        Permissions-Policy[62] 	To allow or disable different features or APIs of the browser. 	Permissions-Policy: fullscreen=(), camera=(), microphone=(), geolocation=(), interest-cohort=()[63]
        Refresh 	Tells the browser to refresh the page or redirect to a different URL, after a given number of seconds (0 meaning immediately); or when a new resource has been created[clarification needed]. Header introduced by Netscape in 1995 and became a de facto standard supported by most web browsers. Eventually standardized in the HTML Living Standard in 2017.[64] 	Refresh: 5; url=http://www.w3.org/pub/WWW/People.html
        Report-To 	Instructs the user agent to store reporting endpoints for an origin. 	Report-To: { "group": "csp-endpoint", "max_age": 10886400, "endpoints": [ { "url": "https-url-of-site-which-collects-reports" } ] }
        Status 	CGI header field specifying the status of the HTTP response. Normal HTTP responses use a separate "Status-Line" instead, defined by RFC 9110.[66] 	Status: 200 OK
        Timing-Allow-Origin 	The Timing-Allow-Origin response header specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross-origin restrictions.[67] 	Timing-Allow-Origin: *
        Timing-Allow-Origin: <origin>[, <origin>]*
        X-Content-Duration 	Provide the duration of the audio or video in seconds. Not supported by current browsers – the header was only supported by Gecko browsers, from which support was removed in 2015.[69] 	X-Content-Duration: 42.666
        X-Content-Type-Options 	The only defined value, "nosniff", prevents Internet Explorer from MIME-sniffing a response away from the declared content-type. This also applies to Google Chrome, when downloading extensions.[71] 	X-Content-Type-Options: nosniff[72]
        X-Powered-By[stackoverflow1 1] 	Specifies the technology (e.g. ASP.NET, PHP, JBoss) supporting the web application (version details are often in X-Runtime, X-Version, or X-AspNet-Version) 	X-Powered-By: PHP/5.4.0
        X-Redirect-By 	Specifies the component that is responsible for a particular redirect. 	X-Redirect-By: WordPress
        X-Redirect-By: Polylang
        X-Request-ID, X-Correlation-ID[stackoverflow2 1] 	Correlates HTTP requests between a client and server. 	X-Request-ID: f058ebd6-02f7-4d3f-942e-904344e8cde5
        X-UA-Compatible 	Recommends the preferred rendering engine (often a backward-compatibility mode) to use to display the content. Also used to activate Chrome Frame in Internet Explorer. In HTML Standard, only the IE=edge value is defined.[75] 	X-UA-Compatible: IE=edge
        X-UA-Compatible: IE=EmulateIE7
        X-UA-Compatible: Chrome=1
        X-XSS-Protection 	Cross-site scripting (XSS) filter 	X-XSS-Protection: 1; mode=block
        */
    }
class SayureHypertextTransferProtocol {
      constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        // Cria a instância do Socket.IO e a armazena
        this.io = new Server(this.server, {
          cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"]
          }
        });
        // Adicione aqui a rota para o servidor NAS
        this.app.use('/nas', (req, res, next) => {
          // A requisição é passada para a classe NAS para ser tratada
          Sayure.NIM.NAS.handleRequest(req, res, next);
        });
        this.app.get('/', (req, res) => {
          res.send('<h1>Hello from Express!</h1>');
        });
      }
      start() {
        const PORT = process.env.PORT || 3000;
        this.server.listen(PORT, () => {
          console.log(`Express server listening on port ${PORT}`);
        });
        this.io.on('connection', (socket) => {
          console.log('A user connected');
          socket.on('disconnect', () => {
            console.log('User disconnected');
          });
          socket.on('chat message', (msg) => {
            this.io.emit('chat message', msg);
          });
        });
      }
      emitToClients(channel, data) {
        if (this.io) {
          this.io.emit(channel, data);
        } else {
          console.error("Socket.IO não inicializado. Não é possível emitir dados.");
        }
      }
    };
module.exports = SayureHypertextTransferProtocol;