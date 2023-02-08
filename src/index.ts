import crypto from "crypto";

interface BlockShape {
  hash: string;
  previousHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public previousHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(previousHash, height, data);
  }

  static calculateHash(
    previousHash: string,
    height: number,
    data: string
  ): string {
    const returnHash = `${previousHash}${height}${data}`;
    return crypto.createHash("sha256").update(returnHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPreviousHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPreviousHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  public getBlocks(): Block[] {
    return [...this.blocks];
  }
}

const blockChain = new BlockChain();

blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");
blockChain.addBlock("Done!");

console.log(blockChain.getBlocks());
