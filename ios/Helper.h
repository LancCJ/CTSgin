//
//  Helper.h
//  CTSgin
//
//  Created by lanccj on 16/12/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

//  Created by Lcq on 15/12/16.
//  Copyright © 2015年 Lcq. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Helper : NSObject

//MD5
+ (NSString *) md5:(NSString *)str;

//Base64
+ (NSString *)base64StringFromText:(NSString *)text;
+ (NSString *)textFromBase64String:(NSString *)base64;
+ (NSString *)base64EncodedStringFrom:(NSData *)data;

//DES加密
+(NSString *)encryptSting:(NSString *)sText key:(NSString *)key andDesiv:(NSString *)ivDes;

//DES解密
+(NSString *)decryptWithDESString:(NSString *)sText key:(NSString *)key andiV:(NSString *)iv;

//AES加密
+ (NSData *)AES128EncryptWithKey:(NSString *)key iv:(NSString *)iv withNSData:(NSData *)data;

//AES解密
+ (NSData *)AES128DecryptWithKey:(NSString *)key iv:(NSString *)iv withNSData:(NSData *)data;

//二进制转16进制
+ (NSString *)data2Hex:(NSData *)data;

@end
