#import "Utils.h"
#import <UIKit/UIKit.h>
#import "AES128Util.h"

@implementation Utils

RCT_EXPORT_MODULE();


RCT_REMAP_METHOD(getUserAccessToken,
                 uuid:(NSString *)uuid
                 sKey:(NSString *)sKey
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  
  NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
  
  NSTimeInterval a=[dat timeIntervalSince1970]*1000; // *1000 是精确到毫秒，不乘就是精确到秒
  
  NSString *timeSp = [NSString stringWithFormat:@"%.0f", a]; //转为字符型
  

//  NSDate *datenow = [NSDate date];//现在时间,你可以输出来看下是什么格式
//  
//  NSString *timeSp =[self getCurrentTime];
  //[NSString stringWithFormat:@"%d", (long)[datenow timeIntervalSince1970]];
  
  NSLog(@"timeSp:%@",timeSp);
  //NSLog(@"timeSp:%@",timeSp); //时间戳的值时间戳转时间的方法
  
  //生成被加密字符串
  NSString *sSrc=[NSString stringWithFormat:@"%@$%@",uuid,timeSp];
  NSLog(@"sSrc:%@",sSrc);
  //加密
  NSString *encryStr = [AES128Util AES128Encrypt:sSrc key:sKey];
//  //解密
//  NSString *decryStr = [AES128Util AES128Decrypt:encryStr key:@"1QAZXSW23EDCVFR4"];
//  
//  NSLog(@"\n加密前：%@\n加密后：%@ \n解密后：%@",@"e22cce61-94dc-4d44-95df-f17f352222c3$1482509368841",encryStr,decryStr);
//
  
  NSDictionary *events=[NSDictionary dictionaryWithObjectsAndKeys:@"0",@"code",encryStr,@"data",nil];
  
  if (events) {
    resolve(events);
  } else {
    NSError *error=[NSError errorWithDomain:@"Promise回调错误信息..." code:101 data:nil];
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
    NSError *error=[NSError errorWithDomain:@"Promise回调错误信息..." code:101 data:nil];
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


- (NSString*)getCurrentTime {
  
  NSDate*datenow = [NSDate date];
  
  NSString*timeSp = [NSString stringWithFormat:@"%ld", (long)datenow];
  
  NSTimeZone*zone = [NSTimeZone timeZoneWithName:@"Asia/Beijing"];
  
  NSInteger interval = [zone secondsFromGMTForDate:datenow];
  
  NSDate*localeDate = [datenow dateByAddingTimeInterval:interval];
  
  NSString*timeSpp = [NSString stringWithFormat:@"%f", localeDate];
  
  return timeSp;
  
}


@end
