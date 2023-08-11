import React from 'react';

const HireMe = () => {
  return (
    <div>
      <h1>Interested in Hiring Me?</h1>
      <form>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <textarea name="message" placeholder="Message" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HireMe;
