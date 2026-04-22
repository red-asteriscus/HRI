<?xml version="1.0" encoding="UTF-8" ?>
<Package name="Project" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="behavior_1" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="welcome" src="welcome/welcome.dlg" />
        <Dialog name="ExampleDialog" src="behavior_1/ExampleDialog/ExampleDialog.dlg" />
        <Dialog name="Arrival_Seating" src="Arrival_Seating/Arrival_Seating.dlg" />
        <Dialog name="Introducing_Guest" src="Introducing_Guest/Introducing_Guest.dlg" />
        <Dialog name="Diploma_Segment" src="Diploma_Segment/Diploma_Segment.dlg" />
        <Dialog name="Closing" src="Closing/Closing.dlg" />
        <Dialog name="Feedback_Survey" src="Feedback_Survey/Feedback_Survey.dlg" />
    </Dialogs>
    <Resources>
        <File name="suit picture" src="html/pics/suit_picture.png" />
        <File name="Graduation_Welcome" src="html/pics/Graduation_Welcome.jpg" />
        <File name="class_of_2026_pic" src="html/pics/class_of_2026_pic.png" />
        <File name="congrats_photo" src="html/pics/congrats_photo.jpg" />
        <File name="diploma_picture" src="html/pics/diploma_picture.png" />
        <File name="seating_map" src="html/pics/seating_map.png" />
        <File name="seats" src="html/pics/seats.png" />
        <File name="arrival.html" src="html/pages/arrival.html" />
        <File name="closing.html" src="html/pages/closing.html" />
        <File name="diploma_segment.html" src="html/pages/diploma_segment.html" />
        <File name="feedback.html" src="html/pages/feedback.html" />
        <File name="introducing_guest.html" src="html/pages/introducing_guest.html" />
        <File name="welcome.html" src="html/pages/welcome.html" />
        <File name="arrival.css" src="html/css/arrival.css" />
        <File name="closing.css" src="html/css/closing.css" />
        <File name="diploma_segment.css" src="html/css/diploma_segment.css" />
        <File name="feedback.css" src="html/css/feedback.css" />
        <File name="introducing_guest.css" src="html/css/introducing_guest.css" />
        <File name="welcome.css" src="html/css/welcome.css" />
        <File name="arrival.js" src="html/js/arrival.js" />
        <File name="closing.js" src="html/js/closing.js" />
        <File name="diploma_segment.js" src="html/js/diploma_segment.js" />
        <File name="feedback.js" src="html/js/feedback.js" />
        <File name="introducing_guest.js" src="html/js/introducing_guest.js" />
        <File name="welcome.js" src="html/js/welcome.js" />
        <File name="wlc" src="html/pics/wlc.jpg" />
        <File name="students" src="students.json" />
        <File name="displayinfo" src="html/js/displayinfo.js" />
        <File name="jquery" src="html/js/jquery.js" />
        <File name="qievents" src="html/js/qievents.js" />
        <File name="confirmation" src="html/pages/confirmation.html" />
        <File name="displaytext" src="html/pages/displaytext.html" />
    </Resources>
    <Topics>
        <Topic name="welcome_enu" src="welcome/welcome_enu.top" topicName="phase2_welcome" language="en_US" />
        <Topic name="ExampleDialog_enu" src="behavior_1/ExampleDialog/ExampleDialog_enu.top" topicName="ExampleDialog" language="en_US" />
        <Topic name="Arrival_Seating_enu" src="Arrival_Seating/Arrival_Seating_enu.top" topicName="Arrival_Seating" language="en_US" />
        <Topic name="Introducing_Guest_enu" src="Introducing_Guest/Introducing_Guest_enu.top" topicName="Introducing_Guest" language="en_US" />
        <Topic name="Diploma_Segment_enu" src="Diploma_Segment/Diploma_Segment_enu.top" topicName="Diploma_Segment" language="en_US" />
        <Topic name="Closing_enu" src="Closing/Closing_enu.top" topicName="Closing" language="en_US" />
        <Topic name="Feedback_Survey_enu" src="Feedback_Survey/Feedback_Survey_enu.top" topicName="Feedback_Survey" language="en_US" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
    </Translations>
</Package>
