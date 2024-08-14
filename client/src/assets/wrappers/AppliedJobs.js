import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--background-secondary-color, #1e1e2f);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow-2);
  margin-bottom: 20px;

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

  .status {
    font-weight: bold;
    color: var(--primary-500, #4e9cff);
  }

  .job-card {
    padding: 15px;
    border-radius: var(--border-radius);
    background: var(
      --card-background-color,
      #f0f0f0
    ); /* Default for light theme */
    margin-bottom: 15px;
    box-shadow: var(--shadow-1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3);
    }
  }

  /* Dark theme adjustments */
  @media (prefers-color-scheme: dark) {
    background: black;

    .job-card {
      background: black ;/* Darker background */
    }

    h3,
    h5,
    p {
      color:black; /* Lighter text color */
    }
  }
`;

export default Wrapper;
