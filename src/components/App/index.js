import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getEmailData,
  getCurrentTag,
  getEmailId,
  readEmail,
  deleteEmail
} from '../../redux/action-creators';
import moment from 'moment';
import '../../style/App.css';

class App extends Component {
  componentDidMount() {
    this.props.getEmails();
  }

  handleTagClick = (tag, init) => {
    this.props.getTag(tag);
    this.props.getId(init);
  };

  handleEmailClick = id => {
    this.props.getId(id);
    this.props.readEmail(id);
  };

  handleDeleteClick = id => {
    this.props.deleteEmail(id);
  };

  render() {
    const { isLoading, emails, error } = this.props.emailsData;
    const emailId = this.props.emailId;
    const currentTag = this.props.currentTag;
    const currentEmailList = emails.filter(email => email.tag === currentTag);
    const currentEmail = currentEmailList.filter(
      email => email.id === emailId
    )[0];

    return (
      <div className="container">
        {isLoading && <div className="loading">Loading ...</div>}
        {!isLoading && (
          <div className="mailbox-container">
            <div className="email-tags">
              <button className="compose-button">
                <i className="fas fa-plus" />
                Compose
              </button>
              <ul>
                <li
                  onClick={() => this.handleTagClick('inbox', null)}
                  className={
                    currentTag === 'inbox' ? 'current-tag' : 'other-tags'
                  }>
                  <i className="fas fa-inbox" />
                  Inbox
                  <span className="count">
                    {emails.filter(email => email.read === 'false').length}
                  </span>
                </li>
                <li
                  onClick={() => this.handleTagClick('sent', null)}
                  className={
                    currentTag === 'sent' ? 'current-tag' : 'other-tags'
                  }>
                  <i className="fas fa-paper-plane" />
                  Sent
                  <span className="count">
                    {emails.filter(email => email.tag === 'sent').length}
                  </span>
                </li>
                <li
                  onClick={() => this.handleTagClick('draft', null)}
                  className={
                    currentTag === 'draft' ? 'current-tag' : 'other-tags'
                  }>
                  <i className="fas fa-edit" />
                  Drafts
                  <span className="count">
                    {emails.filter(email => email.tag === 'draft').length}
                  </span>
                </li>
                <li
                  onClick={() => this.handleTagClick('deleted', null)}
                  className={
                    currentTag === 'deleted' ? 'current-tag' : 'other-tags'
                  }>
                  <i className="fas fa-trash-alt" />
                  Trash
                  <span className="count">
                    {emails.filter(email => email.tag === 'deleted').length}
                  </span>
                </li>
              </ul>
            </div>

            <div className="email-list">
              {currentEmailList.length === 0 && (
                <div className="empty">This folder is empty</div>
              )}
              {currentEmailList.length > 0 && (
                <ul>
                  {currentEmailList.map((email, index) => {
                    return (
                      <li
                        key={index}
                        className={
                          email.read === 'false' ? 'unread-email' : 'red-email'
                        }>
                        <div
                          onClick={() => this.handleEmailClick(email.id)}
                          className={
                            currentEmail && email.id === currentEmail.id
                              ? 'current-email'
                              : 'other-emails'
                          }>
                          <div className="subject-in-list">{email.subject}</div>
                          <div className="from-and-time">
                            <div className="from-in-list">{email.from}</div>
                            <div className="time-in-list">
                              {moment(email.time).format('MMM DD, YYYY')}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="email-detail">
              {!currentEmail && (
                <div className="empty">Select an item to read</div>
              )}
              {currentEmail && (
                <div>
                  <div className="subject-to-time">
                    <div className="subject-in-detail">
                      {currentEmail.subject}
                    </div>
                    {this.props.currentTag !== 'deleted' && (
                      <div
                        className="delete-button"
                        onClick={() => this.handleDeleteClick(currentEmail.id)}>
                        <i className="fas fa-trash-alt" />
                      </div>
                    )}
                    <div className="from-in-detail">
                      From:&nbsp;{currentEmail.from}
                    </div>
                    <div className="time-in-detail">
                      {moment(currentEmail.time).format(
                        'MMM DD, YYYY · hh:mm A'
                      )}
                    </div>
                  </div>
                  <div className="message-in-detail">
                    {currentEmail.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    emailsData: state.emailData,
    currentTag: state.emailTag,
    emailId: state.emailId
  };
};

const mapDispatchToProps = dispatch => ({
  getEmails: () => {
    dispatch(getEmailData());
  },
  getTag: tag => {
    dispatch(getCurrentTag(tag));
  },
  getId: id => {
    dispatch(getEmailId(id));
  },
  readEmail: id => {
    dispatch(readEmail(id));
  },
  deleteEmail: id => {
    dispatch(deleteEmail(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
