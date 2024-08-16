import styled from "styled-components";

export const Wrapper = styled.div`
  background: var(--background-secondary-color, #1e1e2f);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow-2);
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    color: var(--text-primary-color, black);
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
    color: var(--text-primary-color, black);
    margin-bottom: 10px;
  }

  h5 {
    font-size: 16px;
    color: black;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: var(--text-secondary-color, #a0a0a0);
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: var(--border-radius);
    border: 1px solid #ccc;
  }

  button {
    background: var(--primary-500, #4e9cff);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    cursor: pointer;
    margin-top: 10px;
    transition: background 0.3s ease;

    &:hover {
      background: var(--primary-600, #3b7bbf);
    }
  }

  /* Dark theme adjustments */
  @media (prefers-color-scheme: dark) {
    background: #121212;

    h2,
    h3,
    h5,
    p {
      color: white;
    }

    input,
    textarea {
      background: #333;
      color: white;
      border: 1px solid #555;
    }

    button {
      background: #3b7bbf;
    }
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: var(--border-radius);
  background: var(--card-background-color, #f0f0f0);
  box-shadow: var(--shadow-1);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-3);
  }

  h3 {
    font-size: 20px;
    color: var(--text-primary-color, black);
  }

  textarea {
    resize: vertical;
  }
`;
