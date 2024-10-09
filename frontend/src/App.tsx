import React, { useState } from 'react';
import { Form, Input, Button, notification, Card } from 'antd';
import axios from 'axios';

const App = () => {
  const [shortUrl, setShortUrl] = useState(null);
  const [stats, setStats] = useState(null);

  const handleCreateShortUrl = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/urls', {
        originalUrl: values.originalUrl,
      });
      setShortUrl(`http://localhost:4000/${response.data.shortCode}`);
      notification.success({ message: 'Short URL created successfully!' });
    } catch (error) {
      notification.error({ message: 'Failed to create short URL' });
    }
  };

  const handleGetStats = async (values) => {
    try {
      const response = await axios.get(`http://localhost:4000/urls/${values.shortCode}/stats`);
      setStats(response.data);
    } catch (error) {
      notification.error({ message: 'Failed to retrieve stats' });
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <Card title="Create Short URL" style={{ marginBottom: '20px' }}>
        <Form onFinish={handleCreateShortUrl}>
          <Form.Item name="originalUrl" rules={[{ required: true, message: 'Please input the original URL!' }]}>
            <Input placeholder="Enter original URL" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Shorten URL
          </Button>
        </Form>
        {shortUrl && (
          <p>
            Short URL: <a href={shortUrl}>{shortUrl}</a>
          </p>
        )}
      </Card>

      <Card title="Get URL Stats">
        <Form onFinish={handleGetStats}>
          <Form.Item name="shortCode" rules={[{ required: true, message: 'Please input the short code!' }]}>
            <Input placeholder="Enter short code" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Get Stats
          </Button>
        </Form>
        {stats && (
          <div>
            <p>Original URL: {stats.originalUrl}</p>
            <p>Access Count: {stats.accessCount}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default App;
