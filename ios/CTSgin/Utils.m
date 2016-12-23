#import "Utils.h"
#import <UIKit/UIKit.h>

#import "Helper.h"

@implementation Utils

RCT_EXPORT_MODULE();


RCT_REMAP_METHOD(getUserAccessToken,
                 string1:(NSString *)string1
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  
  NSDictionary *events=[NSDictionary dictionaryWithObjectsAndKeys:@"0",@"code",@"",@"data",nil];
  
  if (events) {
    resolve(events);
  } else {
    NSError *error=[NSError errorWithDomain:@"Promise回调错误信息..." code:101 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }

}




//对外提供调用方法,演示Promise使用
RCT_REMAP_METHOD(addWaterMark,
                 orginBase64:(NSString *)orginBase64
                 waterMark1:(NSString *)waterMark1
                 waterMark2:(NSString *)waterMark2
                 waterMark3:(NSString *)waterMark3
                 waterMark4:(NSString *)waterMark4
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
//  
//  //MD5
//  NSString *md5Str = [Helper md5:@"我爱你"];
//  NSLog(@"md5Str is %@",md5Str);//Log is 4F2016C6B934D55BD7120E5D0E62CCE3
//  
//  //Base64
//  NSString *Base64Str = [Helper base64StringFromText:@"我爱你"];
//  NSLog(@"Base64Str is %@",Base64Str);//Log is 5oiR54ix5L2g
//  
//  NSString *oriBase64Str = [Helper textFromBase64String:Base64Str];
//  NSLog(@"oriBase64Str is %@",oriBase64Str);//Log is  我爱你
//  
//  //DES
//  NSString *desEnStr = [Helper encryptSting:@"我爱你" key:@"521" andDesiv:@"521"];
//  NSLog(@"desEnStr is %@",desEnStr);//Log is  389280aa791ee933
//  NSString *desDeStr =[Helper decryptWithDESString:desEnStr key:@"521" andiV:@"521"];
//  NSLog(@"desDeStr is %@",desDeStr);//Log is  我爱你
  
  //AES
  NSData *aesEnData = [Helper AES128EncryptWithKey:@"1QAZXSW23EDCVFR4" iv:nil withNSData:[@"11111$100" dataUsingEncoding:NSUTF8StringEncoding]];
  NSLog(@"aesEnStr is %@",[Helper data2Hex:aesEnData]);//Log is HZKhnRLlQ8XjMjpelOAwsQ==
  
//  NSData *aesDeData = [Helper AES128DecryptWithKey:@"1QAZXSW23EDCVFR4" iv:@"521" withNSData:aesEnData];
//  NSLog(@"aesDEStr is %@",aesDeData);//Log is aesDEStr is 5oiR54ix5L2gAAAAAAAAAA== and result is 我爱你
  
  
 // RCTLogInfo(@"未添加水印%@ 水印%@ 水印Style %@,%@,%@", orginBase64, waterMark1,waterMark2,waterMark3,waterMark4);
  
  //UIImage *image=[self dataURL2Image:orginBase64];
  

  
  //Base64字符串转UIImage图片：
  NSData *decodedImageData = [[NSData alloc]
                              initWithBase64EncodedString:orginBase64 options:NSDataBase64DecodingIgnoreUnknownCharacters];
  UIImage *decodedImage = [UIImage imageWithData:decodedImageData];
  
  //添加水印
  
  //UIImage图片转成Base64字符串：
  
   NSData *data = UIImageJPEGRepresentation([self watermarkImage:decodedImage waterMark1:waterMark1 waterMark2:waterMark2 waterMark3:waterMark3 waterMark4:waterMark4], 1.0f);
  
  NSString *encodedImageStr = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
  
 
  NSDictionary *events=[NSDictionary dictionaryWithObjectsAndKeys:@"0",@"code",encodedImageStr,@"data",nil];
  
  if (events) {
    resolve(events);
  } else {
    NSError *error=[NSError errorWithDomain:@"Promise回调错误信息..." code:101 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }
}

- (NSString*)convertToJSONData:(id)infoDict
{
  NSError *error;
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:infoDict
                                                     options:NSJSONWritingPrettyPrinted // Pass 0 if you don't care about the readability of the generated string
                                                       error:&error];
  
  NSString *jsonString = @"";
  
  if (! jsonData)
  {
    NSLog(@"Got an error: %@", error);
  }else
  {
    jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  }
  
  jsonString = [jsonString stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];  //去除掉首尾的空白字符和换行字符
  
  [jsonString stringByReplacingOccurrencesOfString:@"\n" withString:@""];
  
  return jsonString;
}


-(UIImage *)watermarkImage:(UIImage *)img waterMark1:(NSString *)waterMark1
waterMark2:(NSString *)waterMark2
waterMark3:(NSString *)waterMark3
waterMark4:(NSString *)waterMark4

{
  
 
  
  UIFont* theFont = [UIFont fontWithName:@"Helvetica-Bold" size:16];
  
  NSString* mark1 = waterMark1;
  CGSize mark1Width = [mark1 sizeWithFont:theFont
                       
                        constrainedToSize:CGSizeMake(MAXFLOAT, 0.0)
                       
                            lineBreakMode:NSLineBreakByWordWrapping];
  
  
  
  
  NSString* mark2 = waterMark2;
  CGSize mark2Width = [mark2 sizeWithFont:theFont
                       
                        constrainedToSize:CGSizeMake(MAXFLOAT, 0.0)
                       
                            lineBreakMode:NSLineBreakByWordWrapping];
  

  
  NSString* mark3 = waterMark3;
  
  CGSize mark3Width = [mark3 sizeWithFont:theFont
                       
                        constrainedToSize:CGSizeMake(MAXFLOAT, 0.0)
                       
                            lineBreakMode:NSLineBreakByWordWrapping];
  
  

  
  NSString* mark4 = waterMark4;
  
  CGSize mark4Width = [mark4 sizeWithFont:theFont
                     
                        constrainedToSize:CGSizeMake(MAXFLOAT, 0.0)
                     
                            lineBreakMode:NSLineBreakByWordWrapping];
  
  
  
  CGSize mark4Height = [mark4 sizeWithFont:theFont
                     
                        constrainedToSize:CGSizeMake(100.0, MAXFLOAT)
                     
                            lineBreakMode:NSLineBreakByWordWrapping];

  
  
  int w = img.size.width;
  
  int h = img.size.height;
  
  UIGraphicsBeginImageContext(img.size);
  
  [img drawInRect:CGRectMake(0, 0, w, h)];
  
  NSDictionary *attr = @{
                         
                         NSFontAttributeName: theFont,   //设置字体
                         
                         NSForegroundColorAttributeName : [UIColor whiteColor]      //设置字体颜色
                         
                         };


  
  
   [mark1 drawInRect:CGRectMake(w -mark1Width.width-10, h-mark4Height.height*4+45 , mark1Width.width, mark4Height.height) withAttributes:attr];   //右下角

   [mark2 drawInRect:CGRectMake(w -mark2Width.width-10, h-mark4Height.height*3+30, mark2Width.width, mark4Height.height) withAttributes:attr];   //右下角
  
  
  [mark3 drawInRect:CGRectMake(w -mark3Width.width-10, h-mark4Height.height*2+15 , mark3Width.width, mark4Height.height) withAttributes:attr];   //右下角

  [mark4 drawInRect:CGRectMake(w -mark4Width.width-10, h-mark4Height.height , mark4Width.width, mark4Height.height) withAttributes:attr];   //右下角

  
  
  UIImage *aimg = UIGraphicsGetImageFromCurrentImageContext();
  
  UIGraphicsEndImageContext();
  
  return aimg;
  
}

/**
 加半透明水印
 @param useImage 需要加水印的图片
 @param addImage1 水印
 @returns 加好水印的图片
 */
- (UIImage *)addImage:(UIImage *)useImage addMsakImage:(UIImage *)maskImage msakRect:(CGRect)rect
{
  UIGraphicsBeginImageContext(useImage.size);
  [useImage drawInRect:CGRectMake(0, 0, useImage.size.width, useImage.size.height)];
  
  //四个参数为水印图片的位置
  [maskImage drawInRect:rect];
  UIImage *resultingImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return resultingImage;
}


@end