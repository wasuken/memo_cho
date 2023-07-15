import { useState } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import "./memo.css";

interface IProps {
  id: number;
  contents: string;
  tags: string[];
  onChange: (s: string) => void;
  onDelete: (id: number) => void;
  onTagInputChange: (s: string) => void;
  onTagAllDeleteClick: () => void;
  onTagClick: (tag: string) => void;
}

export default function Memo(props: IProps) {
  const [tagsInput, setTagsInput] = useState<string>("");
  return (
    <Card style={{ width: "25vw" }}>
      <Card.Header>
        <CloseButton onClick={() => props.onDelete(props.id)} />
      </Card.Header>
      <Card.Body>
        <FloatingLabel label="Memo">
          <Form.Control
            as="textarea"
            placeholder="memo"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.onChange(e.target.value)
            }
            value={props.contents}
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </Card.Body>
      <Card.Body>
        <Form.Control
          type="text"
          placeholder="tags"
          value={tagsInput}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const s = e.target.value;
            setTagsInput(s);
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
            paddingTop: "10px",
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              props.onTagInputChange(tagsInput);
              setTagsInput("");
            }}
          >
            Add
          </Button>
          <Button variant="danger" onClick={() => props.onTagAllDeleteClick()}>
            Tags Clear
          </Button>
        </div>
      </Card.Body>
      {props.tags.length > 0 && (
        <Card.Footer>
          {props.tags.map((tag, i) => (
            <Button
              key={i}
              variant="primary"
              onClick={() => props.onTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </Card.Footer>
      )}
    </Card>
  );
}
