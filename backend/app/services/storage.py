import os

def save_dataset(file_obj, dataset_name: str) -> str:
    """Save an uploaded dataset and return its path."""
    os.makedirs("./data", exist_ok=True)
    path = f"./data/{dataset_name}"
    with open(path, "wb") as f:
        f.write(file_obj.read())
    return path


def save_model(exp_id: int) -> str:
    """Persist the trained model checkpoint and return the path."""
    os.makedirs("./checkpoints", exist_ok=True)
    ckpt_path = f"./checkpoints/exp_{exp_id}"
    # Placeholder for saving model weights
    open(ckpt_path, "wb").close()
    return ckpt_path

