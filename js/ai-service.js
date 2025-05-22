// 大模型API服务
const AIModelService = {
    // 使用OpenAI API
    async getOpenAIFortune(birthday) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getOpenAIKey()}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "你是一位精通命理学和占星术的大师。请根据用户提供的生日，给出详细的命运解读，包括性格特点、事业发展、财运、感情等方面。回答要有神秘感，同时要积极正面。"
                        },
                        {
                            role: "user",
                            content: `请根据我的生日 ${birthday} 解读我的命运。`
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 800
                })
            });
            
            if (!response.ok) {
                throw new Error(`OpenAI API请求失败: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API请求失败:', error);
            throw new Error('命运预测服务暂时不可用');
        }
    },
    
    // 使用百度文心一言API
    async getBaiduFortune(birthday) {
        try {
            // 获取访问令牌
            const tokenResponse = await fetch('https://aip.baidubce.com/oauth/2.0/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: this.getBaiduApiKey(),
                    client_secret: this.getBaiduSecretKey()
                })
            });
            
            if (!tokenResponse.ok) {
                throw new Error(`百度API令牌请求失败: ${tokenResponse.status}`);
            }
            
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;
            
            // 调用文心一言API
            const response = await fetch(
                `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${accessToken}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: [
                            {
                                role: "system",
                                content: "你是一位精通命理学和占星术的大师。请根据用户提供的生日，给出详细的命运解读，包括性格特点、事业发展、财运、感情等方面。回答要有神秘感，同时要积极正面。"
                            },
                            {
                                role: "user",
                                content: `请根据我的生日 ${birthday} 解读我的命运。`
                            }
                        ],
                        temperature: 0.7,
                        top_p: 0.8
                    })
                }
            );
            
            if (!response.ok) {
                throw new Error(`百度API请求失败: ${response.status}`);
            }
            
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('百度API请求失败:', error);
            throw new Error('命运预测服务暂时不可用');
        }
    },
    
    // 使用本地模拟API（当其他API不可用时的备选方案）
    async getMockFortune(birthday) {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 解析生日
        const [year, month, day] = birthday.replace(/[年月日]/g, '-').split('-').filter(Boolean);
        
        // 根据生日生成一些伪随机的命运解读
        const fortuneTemplates = [
            `根据您的生日 ${birthday}，命运之轮已经转动...\n\n您天生具有敏锐的直觉和强大的创造力。在人生旅途中，您将遇到许多挑战，但这些挑战将成为您成长的阶梯。\n\n近期运势：事业上有贵人相助，财运稳定上升。感情方面需要更多耐心和沟通。\n\n宜：开拓创新、结交新友\n忌：犹豫不决、过度消费`,
            
            `${birthday}出生的您，拥有天生的领导才能和坚韧不拔的意志力。星象显示，您的命盘中木星与金星形成良好相位，预示着丰厚的财富与和谐的人际关系。\n\n事业上，您适合从事需要创造力和决策力的工作。近期有升职加薪的机会，但需要把握时机，勇敢表达自己的想法。\n\n感情方面，单身的朋友可能会遇到命中注定的人，已有伴侣的需要更多关心对方的情感需求。\n\n健康方面要注意休息，避免过度劳累。`,
            
            `命运的星辰为${birthday}出生的您编织了一条充满智慧与机遇的道路。您的思维敏捷，善于分析问题，是天生的思想家和策略家。\n\n近期运势：\n财运：财运亨通，尤其是在投资方面可能有意外收获。\n事业：工作中可能面临一些挑战，但这些都将成为您展示才能的舞台。\n感情：感情生活平稳，已有伴侣的人关系将更加稳固。\n\n提示：保持开放的心态，接纳新的机会和挑战，将为您带来更多的成功和满足。`
        ];
        
        // 根据生日选择模板
        const templateIndex = (parseInt(year) + parseInt(month) + parseInt(day)) % fortuneTemplates.length;
        return fortuneTemplates[templateIndex];
    },
    
    // 获取OpenAI API密钥
    getOpenAIKey() {
        // 实际应用中应从安全的环境变量或配置中获取
        return 'YOUR_OPENAI_API_KEY';
    },
    
    // 获取百度API密钥
    getBaiduApiKey() {
        // 实际应用中应从安全的环境变量或配置中获取
        return 'YOUR_BAIDU_API_KEY';
    },
    
    // 获取百度Secret密钥
    getBaiduSecretKey() {
        // 实际应用中应从安全的环境变量或配置中获取
        return 'YOUR_BAIDU_SECRET_KEY';
    },
    
    // 主要方法：尝试多种API，确保至少有一个能工作
    async getFortune(birthday) {
        try {
            // 尝试使用OpenAI API
            console.log('尝试使用OpenAI API...');
            return await this.getOpenAIFortune(birthday);
        } catch (error) {
            console.log('OpenAI API失败，尝试百度API...');
            try {
                // 如果OpenAI失败，尝试百度API
                return await this.getBaiduFortune(birthday);
            } catch (error) {
                console.log('百度API也失败，使用本地模拟数据...');
                // 如果两者都失败，使用本地模拟数据
                return await this.getMockFortune(birthday);
            }
        }
    }
};
