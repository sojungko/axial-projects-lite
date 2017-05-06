# Axial Projects Lite
## Getting Started
To run this app in localhost, please paste the following command into your terminal:
```
git clone https://github.com/sojungko/axial-projects-lite.git
cd axial-projects-lite
npm install
npm start
```

The app should run on `localhost:3000` in your browser.

If for whatever reason you run into a problem such as one saying `[0] src/app/create-new.component.ts(113,35): error TS2339: Property 'target_check_size_min' does not exist on type '{ [key: string]: AbstractControl; }'.`, please comment out the `disableButton()` function in `create-new.component.ts`, restart the app and uncomment `disableButton()`. The validation should work hence forward. I am still not sure why this problem exists -- my guess is that it has to do with the way ngForm is initialized. I shall try to debug this when I figure out the problem.

## Comments
For this challenge, I decided to use Angular 2 to prepare myself for the tech stack used at Axial. In-memory-web-api was implemented to simulate database connection. 

Having built a boilerplate with the Tour of Heroes tutorial prior to this challenge, I was able to get the views off the ground relatively quickly. My major challenges, however, were with form control. Having already written two template-based forms, I realized I would lose an unnecessary amount of time refactoring them into reactive forms. I also got stuck creating custom validation Angular's built-in modules. Eventually, I decided to implement them using vanilla JS, hoping to enhance my app's performance along the way. 

Number formatting posed another challenge. To insert commas, I had to stringify the numbers and have them still be recognized as numbers during form control. I addressed the latter issue using RegEx, diabling the button if any input contained characters other than numbers or "," or ".". Comma separators were implemented with the Pipe module. There were quite a few logic gate issues along the way, especially with the way my project ngModel was bound to my ngForm. For instance, my project data, which is stored as numbers, would turn into strings as they were edited. For the minimum-maximum comparison, I needed a mechanism to convert these strings into numbers while keeping the commas intact in view. 

Although it would have been ideal to have my CreateNew and ProjectEdit components share one template, with the time constraints I had, I decided it would be prudent to keep them separate to manage their logics separately.

This challenge was definitely a steep learning curve but a fun experience. If given more time, I would like to render the edit form in modal, as doing so would yield more room to display projects. I would also address the state mutation problem that exists between the Projects and ProjectEdit components. Overall, I am happy with the way this app turned out, considering my limited experience with Angular 2.

Thank you for giving me the opportunity to take this challenge. I hope this README clarifies the process in which I created this app. I look forward to your feedback!