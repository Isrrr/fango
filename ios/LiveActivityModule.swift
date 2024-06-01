//
//  LiveActivityModule.swift
//  fango
//
//  Created by Israpil Ramazanov on 5/30/24.
//

import ActivityKit

@objc(LiveActivity)
class LiveActivity: NSObject {
  
  @objc(startActivity)
  func startActivity() {
    do{
      if #available(iOS 16.1, *){
        let liveActivityAttributes = LiveActivAttributes(name: "Live Activity")
        let liveActivityContentState = LiveActivAttributes.ContentState(bottomText: "Hello", image: "")
        let activity = try Activity<LiveActivAttributes>.request(attributes: liveActivityAttributes, contentState: liveActivityContentState,  pushType: nil)
      }else{
        print("Dynamic Island and live activies not supported")
      }
    }catch (_){
      print("there is some error")
    }
  }
  
  @objc(updateActivity::)
  func updateActivity(name: String, image: String){
    do{
      if #available(iOS 16.1, *){
        let liveActivityContentState = LiveActivAttributes.ContentState(bottomText: name, image: image)
        Task{
          for activity in Activity<LiveActivAttributes>.activities {
            await activity.update(using: liveActivityContentState)
          }
        }
      }
    }catch(_){
      print("some error")
    }
  }
  
  @objc(endActivity)
  public static func endActivity(){
    print("Ending Live Activities")
    let semaphore = DispatchSemaphore(value: 0)
    Task
    {
      for activity in Activity<LiveActivAttributes>.activities
      {
        print("Ending Live Activity: \(activity.id)")
        await activity.end(nil, dismissalPolicy: .immediate)
      }
      semaphore.signal()
    }
    semaphore.wait()
  }
}
