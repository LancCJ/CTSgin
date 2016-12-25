//
//  AES128Util.h
//  EncryptDemo
//
//  Created by lanccj on 2016/12/24.
//  Copyright © 2016年 lanccj. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AES128Util : NSObject

+(NSString *)AES128Encrypt:(NSString *)plainText key:(NSString *)key;

+(NSString *)AES128Decrypt:(NSString *)encryptText key:(NSString *)key;

@end
