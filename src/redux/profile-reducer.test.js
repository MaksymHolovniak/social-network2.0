import profileReducer, { addPost, deletePost } from "./profile-reducer";

let state = {
  posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 15 },
      { id: 2, message: 'Where are you from?', likesCount: 20 }
  ]
}

test('length of posts shoulb be incremented', () => {
  let action = addPost('Good project');

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(3);
});

test('message of new post shoulb be correct', () => {
  let action = addPost('Good project');

  let newState = profileReducer(state, action)

  expect(newState.posts[2].message).toBe('Good project')
});

test('after deleting length of messages should be decrement', () => {
  let action = deletePost(1);

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(1)
});

test('after deleting length should not be decrement if id is incorrect  ', () => {
  let action = deletePost(1000);

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(2)
});
