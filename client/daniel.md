# AuthModal Refactor

I've setup two files for you to work through: `signinForm.js` and `signupForm.js` which can be found in their own folders in `client/src/components/...`

**Sidebar before I continue:** The way react works under the hood can be a bit confusing just by looking at the code, so I'll be sure to walk you through everything in class.  You can take a look at the documentation if you want - in fact the docs for React are outstanding - however, since hooks are so new most of the docs are still written with ES6 class components.  The code style (Hooks vs. ES6 components) is just different enough that I think it might make it more confusing to try and learn both at the same time.

At the bottom, I included a section, **Reference Info**, that I'm hoping will answer some questions you might come across.

Anyways, on to the setup.  I pushed up a new branch: `auth-modal-refactor` for you to get started.  You will need to checkout a new local branch (based off the most recent master branch) and THEN pull my `auth-modal-refactor` branch into yours.  I find it helpful to keep the names the same - I don't plan to edit this branch any longer, so feel free to take it for yourself.

Open up VS Code and start the dev server: `npm run dev` - If you get errors here that you can't figure out, slack me a screenshot of the error messages and I'll try and figure it out.

Navigate to `client/src/components/signinForm/signinForm.js`

I got this file to a half-finished state, with only an email input field and want you to complete it by adding the password input field.  Admittedly, this is a pretty easy task that you can complete with copy/paste and renaming variables, but I encourage you to play around with it to feel comfortable with the concepts.

Notice that the `input` tag uses the `value` and `onChange` attributes, which are set to a state variable and a function.  This is absolutely necessary for input forms like this.

In a standard HTML/JS setup, you'd have a form like this and wouldn't need to worry about setting `value` and `onChange` attribute unless you wanted it to start with a certain value.  On submit, you'd just grab the `input`'s value using something like jQuery and be on your merry way.  We don't use jQuery with React, so we need a way to store what the user puts in the `input` tag.  We solve this by using a state variable to keep track of the value and an update function to update that value.

When you're finished with the Sign In Form, navigate to `client/src/components/signupForm/signupForm.js`

This file is mostly empty, but you'll be doing the exact same thing as you did in the Sign In Form.  Hopefully more typing leads to better understanding.

## Bonus - If you're up for it

When you finish this file and the auth modal is working as it should, feel free to try breaking down the signin/signup form components.  Each input group can be its own component, so in the case of `signinForm.js` instead of:

```
return (
    <form>
      <div className='modal-body'>
        <div className='form-group'>
          <label>Email Address</label>
          <input type='email' className='form-control' placeholder='Enter email' value={emailVal} onChange={handleEmailChange}></input>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' placeholder='Password' value={passwordVal} onChange={handlePasswordChange}></input>
        </div>
    
        {/* LEAVE THE BELOW HTML AS IS */}
        <button type='button' className='btn btn-link' onClick={props.toggleModalType}>{props.changeTypeBtnText}</button>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
        </div>
      </div>
    </form>
);
```
  
You could turn it into this:

```
return (
    <form>
      <div className='modal-body'>
        <FormInput labelText='Email' placeholder='Email' value={emailVal} onChange={handleEmailChange} />
        <FormInput labelText='Password' placeholder='Password' value={PasswordVal} onChange={handlePasswordChange} />

        {/* LEAVE THE BELOW HTML AS IS */}
        <button type='button' className='btn btn-link' onClick={props.toggleModalType}>{props.changeTypeBtnText}</button>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
        </div>
      </div>
    </form>
);
```

The above is not as simple as it seems on the surface because the `<FormInput />` components will need to be "controlled" components - more on that below.  It's a pretty common concept in React, but can be slightly confusing to newer React programmers.

Please let me know if you have any questions.  I love using React and really enjoy helping other people learn it, so don't feel like you're bothering me by asking questions.  Plus, teaching someone else is the best way to learn.


## Reference Info

### Importing React
The first line of each component file always imports React: `import React from 'react';` (It doesn't have to be the first line, but it's common practice for it to be at the top)

Two things are important about this, (1) the syntax, and (2) the `React`
1. The syntax is probably different than what you're used to.  `import React from 'react';` is the same thing as `const React = require('react');` The reason we do it the first way is because React uses Babel to compile its code, which is different than what node and the browser use.  
    * Babel also changes the syntax for exports.  You'll notice that at the end of component files we say `export default ComponentName;` instead of `module.exports = ComponentName;`
2. The `React`.  You may notice that we don't actually make a call to or reference the `React` object in our component files.  If we don't use it, why are we importing it?  It's because React has it's own syntax (different from Babel), which is why a lot of React files have a `.jsx` extension (it's not necessary, but it's a quick way to let people know that certain files are React files).  If we don't import React then we can't use its syntax, i.e. writing HTML directly in a javascript file.

### useState
`useState` is the most basic of React's "hooks".  It allows you to manage each component's local state (read: variables) throughout a component's lifecycle.

You may wonder to yourself: "why should I use the state hook instead of just creating variables in my component?"  The best answer to that question is because you'll often display the values stored in local state on the DOM and if those values change you'll want the component to update the DOM with the new values. React WILL NOT rerender a component if a standard run-of-the-mill variable changes, but it DOES rerender when its state changes.

What the hell is going on with `useState` and how do I manage it?

First, let me say the most important rule with `useState`:
*   `useState` can only be called at the top level of your component function.  That is a hard and fast rule, bar none.
*   You cannot call `useState` inside an `if` block.  You cannot call `useState` inside a `function`, it MUST be called at the top level of your component - see the example in the `signinForm.js` starter code.

**Managing State**

`const [emailVal, setEmailVal] = useState('');`

You will call `useState` only once per state variable in your components.  `useState` takes one parameter, which is the initial state you want to set and returns an array with two items.

In the above example, `emailVal` is our state variable, initialized to an empty string, and `setEmailVal` is a function that updates that value.

** IMPORTANT **
**Never ever set `emailVal` directly**
If you want to change `emailVal` to 'daniel@test.com', you do it by calling the update function: `setEmailVal('daniel@test.com');`  The nitty gritty is a bit complex, and I don't think I know enough to explain why, but I do know that modifying state values directly is absolutely not allowed.

### Inserting state/javascript into HTML

Writing HTML in React files is generally only done inside `return` statements and once you start writing HTML, any javascript syntax will throw an error unless you wrap it in `{}`.

If you take a look at the starter code in `signinForm.js`:
```
return (
    ...
    <div className='form-group'>
      <label>Email Address</label>
      <input type='email' className='form-control' placeholder='Enter email' value={emailVal} onChange={handleEmailChange}></input>
    </div>
    ...
);

```
Looking at the `value` and `onChange` attributes, you'll notice they use the curly braces to javascript variables.  This could easily have been done for the `label` tag as well:
```
let emailLabelText = 'Email Address';

return (
    <label>{emailLabelText}</label>
);
```

### props

`props` are to React components as `attributes` are to HTML tags

Take a look at line 75 in `authModal.js`, you'll see:
`<SigninForm toggleModalType={toggleModalType} changeTypeBtnText={changeTypeBtnText} />`

The SigninForm component has two props, which happen to also be the names of the variables you're passing to them.  This is not a requirement, but sometimes it works out that way.

Now if you look at `signinForm.js` on line 8, you'll see:
`function SigninForm(props) {`

`props` is an object whose keys match the names you gave it when `authModal.js` rendered it.  So to access the prop `toggleModalType` inside the SigninForm component, you'd simply call `props.toggleModalType`

### controlled components

The concept of controlled components is perfectly illustrated by a signin form.  When you get to the "Bonus" section above, you'll be breaking down the content in `<SigninForm />` to be their own components.  Basically each input group will be rendered by the parent component - `<SigninForm />` - as `<FormInput />` components (called `child` components) with the appropriate props passed down.

Now consider the use case of a sign in form.  It has an email input field and a password input field.  When the user hits the submit button, we need to grab the values of those input fields and send the info in an http request.

But how do we grab that info?  Let's say the submit button resides in the parent `<SigninForm />` component.  In this case, the parent component, `<SigninForm />` is responsible for passing the email and password through the http request, BUT the email and password values are not stored in `<SigninForm />`, they're stored in their own `<FormInput />` components so it can't access them.

What if we put the submit button in one of the `<FormInput />` components? Nope.  It would only have access to one of the pieces of information.

The solution is to make `<FormInput />` a controlled component. This means that the parent component (`<SigninForm />` in this case) will have a state variable for each value you need.  In order to ensure the `input` tags within `<FormInput />` function properly, you pass the state variables from `<SigninForm />` AND their update functions as props to `<FormInput />`.  It would look something like this:
```
// signinForm.js
const [emailVal, setEmailVal] = useState('');

return (
  <FormInput value={emailVal} onChange={setEmailVal} (other props) />
);

// formInput.js
function FormInput(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  }

  return (
    <label>{props.labelTitle}</label>
    <input type='email' value={props.value} onChange={handleChange} />
  );
}
```
Note that I named the props of `<FormInput />` as `value` and `onChange`.  Props names do not have to match the HTML attribute names they'll eventuall go to, they can be any valid variable name.  I just find it helpful to name them as close to what they'll actually represent as possible.