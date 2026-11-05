import { request } from './client';

export const supportService = {
  answerPreparedSupportQuestion: (topicId) => request('/support/answer', {
    method: 'POST',
    body: JSON.stringify({ topicId })
  }),
  createSupportInquiry: (data) => request('/support/inquiries', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getSupportInquiries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/support/inquiries${query ? `?${query}` : ''}`);
  },
  getSupportInquiry: (id, guestAccessToken) => request(`/support/inquiries/${encodeURIComponent(id)}`, {
    headers: guestAccessToken ? { 'X-Support-Access-Token': guestAccessToken } : {}
  }),
  addSupportMessage: (id, text, guestAccessToken) => request(`/support/inquiries/${encodeURIComponent(id)}/messages`, {
    method: 'POST',
    headers: guestAccessToken ? { 'X-Support-Access-Token': guestAccessToken } : {},
    body: JSON.stringify({ text })
  }),
  replyToSupportInquiry: (id, reply) => request(`/support/inquiries/${encodeURIComponent(id)}/reply`, {
    method: 'POST',
    body: JSON.stringify({ reply })
  }),
  closeSupportInquiry: (id) => request(`/support/inquiries/${encodeURIComponent(id)}/close`, {
    method: 'POST'
  })
};
