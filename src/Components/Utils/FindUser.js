

export default function FindUser(users,userId) {
let userIndex= users.findIndex((user) => user._id===userId);
 if (userIndex === -1) 
      return {};
 return users[userIndex ]  ;
}
