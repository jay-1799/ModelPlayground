import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  Database,
  Download,
  Eye,
  MessageSquare,
  Play,
  Plus,
  Settings2,
  Trash2,
  Upload,
  Zap,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("datasets");
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [experiments, setExperiments] = useState([
    {
      id: 1,
      name: "FAQ Fine-tune v1",
      status: "completed",
      model: "Llama-2-7b",
      dataset: "product-faqs.csv",
      accuracy: 0.89,
      createdAt: "2024-01-20",
    },
    {
      id: 2,
      name: "Customer Support LoRA",
      status: "training",
      model: "Llama-2-7b",
      dataset: "support-chat.json",
      accuracy: null,
      createdAt: "2024-01-21",
    },
  ]);
  const [datasets] = useState([
    {
      id: 1,
      name: "product-faqs.csv",
      size: "2.4 MB",
      rows: 1250,
      uploaded: "2024-01-20",
    },
    {
      id: 2,
      name: "support-chat.json",
      size: "5.1 MB",
      rows: 2300,
      uploaded: "2024-01-21",
    },
    {
      id: 3,
      name: "knowledge-base.txt",
      size: "8.7 MB",
      rows: 4100,
      uploaded: "2024-01-19",
    },
  ]);

  const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  const DatasetCard = ({ dataset, isSelected, onClick }) => (
    <div
      onClick={() => onClick(dataset)}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Database size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
            <p className="text-sm text-gray-500">
              {dataset.size} • {dataset.rows.toLocaleString()} rows
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Eye size={16} />
        </button>
      </div>
      <div className="text-xs text-gray-500">Uploaded {dataset.uploaded}</div>
    </div>
  );

  const ExperimentCard = ({ experiment }) => (
    <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {experiment.name}
          </h3>
          <p className="text-sm text-gray-600">
            {experiment.model} • {experiment.dataset}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${experiment.status === "completed" ? "bg-green-100 text-green-700" : experiment.status === "training" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
        >
          {experiment.status === "completed" && <CheckCircle size={14} />}
          {experiment.status === "training" && <Clock size={14} />}
          {experiment.status === "failed" && <AlertCircle size={14} />}
          {experiment.status.charAt(0).toUpperCase() +
            experiment.status.slice(1)}
        </div>
      </div>
      {experiment.accuracy && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">
            Accuracy: {(experiment.accuracy * 100).toFixed(1)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
              style={{ width: `${experiment.accuracy * 100}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Created {experiment.createdAt}
        </span>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
            <MessageSquare size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
            <Download size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "datasets":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Datasets</h2>
                <p className="text-gray-600">
                  Upload and manage your training datasets
                </p>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Upload size={16} />
                Upload Dataset
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload your dataset
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and Drop your CSV, JSON, or TXT files here
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Files
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {datasets.map((dataset) => (
                <DatasetCard
                  key={dataset.id}
                  dataset={dataset}
                  isSelected={selectedDataset?.id === dataset.id}
                  onClick={setSelectedDataset}
                />
              ))}
            </div>
          </div>
        );
      case "training":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Training Configuration
                </h2>
                <p className="text-gray-600">
                  Configure hyperparameters and start fine-tuning
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Brain size={20} className="text-purple-600" />
                    Model Selection
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Model
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>meta-llama/Llama-2-7b-hf</option>
                        <option>meta-llama/Llama-2-13b-hf</option>
                        <option>mistralai/Mistral-7B-v0.1</option>
                        <option>microsoft/DialoGPT-medium</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dataset
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Select a Dataset</option>
                        {datasets.map((dataset) => (
                          <option key={dataset.id} value={dataset.id}>
                            {dataset.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 size={20} className="text-blue-600" />
                    LoRA Configuration
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rank (r)
                      </label>
                      <input
                        type="number"
                        defaultValue="8"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alpha
                      </label>
                      <input
                        type="number"
                        defaultValue="16"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dropout
                      </label>
                      <input
                        type="number"
                        defaultValue="0.05"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label>Epochs</label>
                      <input
                        type="number"
                        defaultValue="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-orange-600" />
                    Training Parameters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Batch Size
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>1</option>
                        <option>2</option>
                        <option selected>4</option>
                        <option>8</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Learning Rate
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        defaultValue="0.0002"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Sequence Length
                      </label>
                      <input
                        type="number"
                        defaultValue="512"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to Train?
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Your model will be fine tuned with the selected parameters
                  </p>
                  <button>
                    <Play size={20} />
                    Start Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "experiments":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Experiments
                </h2>
                <p className="text-gray-600">
                  Monitor and compare your fine-tuning experiments
                </p>
              </div>
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Plus size={16} />
                New Experiment
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experiments.map((experiment) => (
                <ExperimentCard key={experiment.id} experiment={experiment} />
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-green-600" />
                Performance Comparison
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Training metrics visualization will appear here</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "chat":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Chat Interface
                </h2>
                <p className="text-gray-600">
                  Test your fine-tuned models in real-time
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>FAQ Fine-tune v1</option>
                  <option>Customer Support LoRA</option>
                  <option>Base Llama-2-7b</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 h-96 flex flex-col">
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                      <p className="text-sm">
                        Hello! I'm your fine-tuned model. How can I help you
                        today?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                      <p className="text-sm">What are your return policies?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2 max-w-md">
                      <p className="text-sm">
                        Our return policy allows returns within 30 days of
                        purchase. Items must be in original condition with tags
                        attached. You can initiate a return through your account
                        dashboard or contact customer service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h h-screen bg-gray-50">
      {/* headr  */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-7-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ModelPlayground</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">GPU:</span> NVIDIA RTX 4090
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Ready</span>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* navigation  */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-xl border border-gray-200">
          <TabButton
            id="datasets"
            icon={Database}
            label="Datasets"
            isActive={activeTab === "datasets"}
            onClick={setActiveTab}
          />
          <TabButton
            id="training"
            icon={Settings2}
            label="Training"
            isActive={activeTab === "training"}
            onClick={setActiveTab}
          />
          <TabButton
            id="experiments"
            icon={BarChart3}
            label="Experiments"
            isActive={activeTab === "experiments"}
            onClick={setActiveTab}
          />
          <TabButton
            id="chat"
            icon={MessageSquare}
            label="Chat"
            isActive={activeTab === "chat"}
            onClick={setActiveTab}
          />
        </nav>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
