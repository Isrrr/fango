//
//  LiveActivityBridge.m
//  fango
//
//  Created by Israpil Ramazanov on 5/31/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LiveActivity, NSObject)

RCT_EXTERN_METHOD(startActivity)
RCT_EXTERN_METHOD(updateActivity: (NSString *) name: (NSString *) image)
RCT_EXTERN_METHOD(endActivity)

@end

