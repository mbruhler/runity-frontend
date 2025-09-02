---
title: "Do we really need LangGraph to build advanced agent workflows?"
date: "2025-08-31"
readTime: "8 min read"
category: "AI & Automation"
excerpt: "Discover how to build custom agent graphs tailored to your specific needs"
author: "Michał Broler"
---

## 🤔 Do we really need LangGraph?

**Agent graphs** are revolutionizing how we build AI applications. Each agent is a node in the graph, giving us **reduced contexts**, **higher precision**, and the ability to **hierarchically control** processes.

But is installing dependencies like **LangGraph** really necessary?

### ⚠️ Problems with external libraries

- **Frequent updates** force constant code changes
- **Abstraction layers** limit control over processes
- **Vendor lock-in** makes migration and customization difficult
- **Complexity** can be overkill for simple use cases

### 💡 Alternative: custom implementation

Creating your own agent framework is **simpler than you think** and gives you **full control** over the architecture.

## 🏗️ Foundation: BaseAgent and BaseTool 

The foundation of our framework consists of two key classes:

```javascript
// 🔧 BaseTool - foundation for all tools
class BaseTool {
    async execute(input) {
        try {
            const result = await this._run(input);
            return typeof result === 'object' ? JSON.stringify(result) : result;
        } catch(e) {
            return `Error: ${e.message}`;
        }
    }
    
    // Implemented by concrete tools
    abstract _run(input);
}

// 🤖 BaseAgent - base class for agents  
class BaseAgent {
    constructor(options) {
        this.options = options;
        this.tools = options.tools || [];
    }

    abstract execute(state);
    
    async callTool(toolName, input) {
        const tool = this.tools.find(t => t.name === toolName);
        return await tool.execute(input);
    }
    
    async onEnter(state) {
        console.log(`🚀 Starting: ${this.options.name}`);
        return state;
    }
}
```

## 🛠️ Tools in action

Here are some basic tools that showcase the framework's capabilities:

```javascript
// 📊 Sentiment analysis
class SentimentTool extends BaseTool {
    name = "sentiment_analysis";
    
    async _run(input) {
        // Integration with API or custom model
        return {
            sentiment: "positive", 
            confidence: 0.85,
            text: input.text
        };
    }
}

// 🔍 Web search  
class WebSearchTool extends BaseTool {
    name = "web_search";
    
    async _run(input) {
        // Call to search API
        return {
            query: input.query,
            results: [
                { title: "AI Trends 2025", snippet: "Latest AI developments..." },
                { title: "Automation Guide", snippet: "Business process automation..." }
            ]
        };
    }
}
```

## 🚀 Agent in practice

Let's see how to create a **smart agent** combining analysis and search:

```javascript
class SmartResearchAgent extends BaseAgent {
    constructor(options) {
        super({
            name: "SmartResearcher",
            tools: [new SentimentTool(), new WebSearchTool()],
            ...options
        });
    }
    
    async execute(state) {
        await this.onEnter(state);
        
        // 📊 Analyze input
        const sentiment = await this.callTool("sentiment_analysis", {
            text: state.input_text
        });
        
        // 🔍 Search for additional information
        const searchResults = await this.callTool("web_search", {
            query: state.research_query
        });
        
        const updatedState = {
            ...state,
            sentiment: JSON.parse(sentiment),
            research: JSON.parse(searchResults),
            analysis_complete: true
        };
        
        // 🎯 Dynamic routing
        const nextStep = updatedState.sentiment.confidence > 0.8 
            ? "content_generator" 
            : "human_review";
            
        return { state: updatedState, nextNode: nextStep };
    }
}
```

## 🔗 Workflow orchestrator

```javascript
class SimpleOrchestrator {
    constructor(agents) {
        this.agents = agents;
    }
    
    async run(initialState, startingAgent) {
        let currentState = initialState;
        let currentAgent = startingAgent;
        
        while (currentAgent && this.agents[currentAgent]) {
            const result = await this.agents[currentAgent].execute(currentState);
            currentState = result.state;
            currentAgent = result.nextNode;
            
            if (result.nextNode === "END") break;
        }
        
        return currentState;
    }
}

// Usage
const orchestrator = new SimpleOrchestrator({
    research: new SmartResearchAgent(),
    // ... other agents
});

const result = await orchestrator.run({
    input_text: "AI will increase efficiency by 300%",
    research_query: "AI efficiency 2025"
}, "research");
```

## Benefits of this approach

Custom implementation of agents and tools provides:

### 1. **Full architectural control**
- Define exactly how agents communicate with each other
- Introduce your own patterns and conventions
- Easy adaptation to specific business requirements

### 2. **No vendor lock-in**
- Not dependent on external library updates
- Migrate between different AI models without refactoring
- Full control over security and data privacy

### 3. **Performance optimization**
- Optimize each component for your needs
- No overhead from universal libraries
- Better control over memory and resource management

### 4. **Easy debugging and monitoring**
- Know exactly what happens at each step
- Add your own profiling tools
- Full execution logs without black boxes

### 5. **Integration flexibility**
- Easy connection with existing systems
- Use any libraries and APIs
- Simple addition of new functionality