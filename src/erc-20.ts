import { Address } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  ERC20,
  Transfer as TransferEvent
} from "../generated/ERC20/ERC20"
import { Approval, Transfer } from "../generated/schema"

let Token = ERC20.bind(Address.fromString("0x4aCD8A003d7C6d1B02C7F0B44976CcbFC1d07B3f"))

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
  entity.balanceFrom = Token.balanceOf(event.params.from)

  entity.save()
}
