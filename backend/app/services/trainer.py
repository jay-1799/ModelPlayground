from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model, TaskType

from . import storage, persistence

class TrainRequest(BaseModel):
    exp_id: int
    dataset_id: int
    model_name: str
    lora_r: int
    lora_alpha: int
    lora_dropout: float
    epochs: int
    batch_size: int

async def run_training(payload: TrainRequest) -> None:
    """run fine tuning with LORA and updated the experiemnt record"""
    dataset_path = persistence.get_dataset_path(payload.dataset_id)

    # load base mode and tokenizer 
    model = AutoModelForCausalLM.from_pretrained(payload.model_name)
    tokenizer = AutoTokenizer.from_pretrained(payload.model_name)

    # apply lora 
    lora_config = LoraConfig(
        r = payload.lora_r,
        lora_alpha = payload.lora_alpha,
        lora_dropout = payload.lora_dropout,
        task_type = TaskType.CAUSAL_LM,
    )
    model = get_peft_model(model, lora_config)

    with open(dataset_path, "r", encoding="utf-8") as f:
        lines = [tokenizer(line.strip(), return_tensors="pt") for line in f if line.strip()]

    args = TrainingArguments(output_dir="./outputs", num_train_epochs=payload.epochs, per_device_train_batch_size=payload.batch_size)

    class SimpleDataset:
        def __init__(self, items):
            self.items = items

        def __len__(self):
            return len(self.items)
        def __getitem__(self, idx):
            return {k: v.squeeze() for k,v in self.items[idx].items()}
        
    train_dataset = SimpleDataset(lines)
    trainer = Trainer(model=model, args = args, train_dataset=train_dataset)
    trainer.train()

    checkpoint_path = storage.save_model(payload.exp_id)

    metrics = {"train_loass": trainer.state.log_history[-1].get("loss")}

    persistence.update_experiment(payload.exp_id, metrics=metrics, checkpoint_path=checkpoint_path)