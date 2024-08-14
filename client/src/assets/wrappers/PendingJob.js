import styled from 'styled-components';

const Wrapper = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow-2);
  margin-bottom: 20px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--grey-200);
    padding-bottom: 10px;
  }

  .main-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-500);
    border-radius: 50%;
    color: var(--white);
    font-size: 24px;
  }

  .info {
    flex-grow: 1;
    margin-left: 20px;
    h5 {
      margin: 0;
      font-size: 18px;
      color: var(--text-primary-color);
    }
    p {
      margin: 0;
      color: var(--text-secondary-color);
    }
  }

  .content {
    padding: 10px 0;
  }

  .applicant-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: var(--background-primary-color);
    border-radius: var(--border-radius);
    margin-bottom: 10px;
    box-shadow: var(--shadow-1);

    &:last-child {
      margin-bottom: 0;
    }
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .edit-btn,
  .delete-btn {
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .edit-btn {
    background: var(--primary-500, #007bff); /* Fallback to a blue color */
    color: var(--white, #ffffff); /* Fallback to white */
    margin-right: 10px;

    &:hover {
      background: var(--primary-700, #0056b3); /* Fallback to a darker blue */
    }
  }

  .delete-btn {
    background: var(--danger-500, #dc3545); /* Fallback to a red color */
    color: var(--white, #ffffff); /* Fallback to white */

    &:hover {
      background: var(--danger-700, #c82333); /* Fallback to a darker red */
    }
  }
`;

export default Wrapper;
