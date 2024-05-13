import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  ERC20,
  Transfer as TransferEvent
} from "../generated/ERC20/ERC20"
import { Approval, Transfer } from "../generated/schema"

let Token = ERC20.bind(Address.fromString("0xb130e16D79C853313672B14e54baFe622db22bB3"))

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  // entity.balanceFrom = BigInt.fromString("1")
  entity.balanceFrom = Token.balanceOf(entity.from)
  log.info("-----Transfer event----------: {}", [entity.id.toHexString()])
  entity.save()
}
