//
//  LiveActivLiveActivity.swift
//  LiveActiv
//
//  Created by Israpil Ramazanov on 5/31/24.
//
import ActivityKit
import WidgetKit
import SwiftUI

struct LiveActivAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var bottomText: String
    var image: String
  }
  
  var name: String
}

struct LiveActivLiveActivity: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: LiveActivAttributes.self) { context in
      // Lock screen/banner UI goes here
      VStack {
        Text("Hello")
      }
      .activityBackgroundTint(Color.cyan)
      .activitySystemActionForegroundColor(Color.black)
      
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          if let imageData = Data(base64Encoded: context.state.image, options: .ignoreUnknownCharacters),
             let uiImage = UIImage(data: imageData) {
            Image(uiImage: uiImage)
              .resizable()
              .aspectRatio(contentMode: .fit)
          } else {
            Image("Qwerty").resizable().aspectRatio(contentMode: .fit)
          }
        }
        DynamicIslandExpandedRegion(.trailing) {
          Text(context.state.bottomText)
        }
        DynamicIslandExpandedRegion(.bottom) {
        }
      } compactLeading: {
        
      } compactTrailing: {
        
      } minimal: {
        
      }
      .widgetURL(URL(string: "http://www.apple.com"))
      .keylineTint(Color.red)
    }
  }
}
