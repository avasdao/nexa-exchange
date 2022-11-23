---
sidebar_position: 5
---

# Security

> Here we discuss the various security procedures and practices used by the Exchange.

Keeping funds SAFU is of the absolute TOP priority when it comes to the design and implementation of this Exchange.

### Hardware Security

Both [__Hardware Security Modules (HSMs)__](https://en.wikipedia.org/wiki/Hardware_security_module) and [__Enclaves__](https://read.cash/@SmartBCH/cloud-enclaves-and-their-applications-in-blockchains-6cc24512) provide "physical" security in the face of a potential security breach. Private keys are irrevocably bound to the hardware that hosts them, and are irretrievable otherwise.

:::info

__Did you know? —__ The revised SHA-Gate v2 plan introduces the use of Enclaves.

"Enclaves are the ideal method to protect private keys on cloud."
However, there are very few cloud providers that offer this level of service, which restricts the "practical" pool size of decentralization down to a single-digit number of "Big Tech" networks.
:::

__The current list of cloud-based HSMs and Enclaves include:__

1. Amazon Web Services (AWS)
2. Microsoft Azure
3. Google Cloud

### Disk Encryption

A very common practice is to fully encrypt a disk. During the boot process, a key is required to decrypt and boot the operating system.

Similarly, encrypted containers serve a similar purpose. They provide a secure folder/directory on the system to hold sensitive data. In this case, decryption occurs after the operating system has booted.



- Multi-signature wallets
- Two-factor authentication
- End-to-end encryption


## Wallets

All wallet's are multi-signature.

Visit our detailed summary at out [__Your Keys. Your Coins.__](/your-keys-your-coins) for more information.


## Authentication

_TBD_


## Encryption

_TBD_
