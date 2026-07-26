import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import main


class EnvLoadingTests(unittest.TestCase):
    def test_loads_dotenv_local_from_project_root(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            project_root = Path(tmpdir) / "managed-chatkit"
            project_root.mkdir(parents=True, exist_ok=True)
            (project_root / ".env.local").write_text(
                "OPENAI_API_KEY=test-key\n",
                encoding="utf-8",
            )

            os.environ.pop("OPENAI_API_KEY", None)

            self.assertTrue(main.load_environment_from_path(project_root / ".env.local"))
            self.assertEqual(os.environ["OPENAI_API_KEY"], "test-key")


if __name__ == "__main__":
    unittest.main()
