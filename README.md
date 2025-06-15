# CI/CD Multicloud – Stage & Produção com Kubernetes + Monitoramento

## 📌 Visão Geral

Este projeto simula uma arquitetura **multinuvem** composta por dois ambientes isolados:

- **Ambiente de Stage**: Provisionado no Google Cloud Platform (GCP)
- **Ambiente de Produção**: Provisionado também na GCP porém em outra conta

Cada ambiente conta com sua própria infraestrutura de **Kubernetes (GKE)** e sistema de **monitoramento Prometheus + Grafana**, além de pipelines CI/CD independentes automatizando a entrega contínua da aplicação.

---

## 🚀 Instruções de Uso

### 🔧 Pré-requisitos

- Conta válida no GitHub com acesso ao repositório
- Acesso às contas de nuvem (GCP)
- Configuração dos secrets no GitHub:
  - `GCP_SA_KEY`, `GKE_PROJECT`

### 📂 Estrutura do Repositório

```bash
.
├── terraform/
│   ├── prod/          # Infraestrutura do ambiente de produção
│   └── stage/         # Infraestrutura do ambiente de homologação
├── k8s/
│   └── frontend/      # Manifests Kubernetes da aplicação
├── .github/
│   └── workflows/
│       ├── front.yml  # Arquivo da pipeline     
```

### ▶️ Executando o Pipeline

1. Faça um **push** para a branch `main` do repositório
2. O GitHub Actions será acionado automaticamente
3. As etapas automatizadas são:

```text
1. Provisionamento da infraestrutura com Terraform
2. Configuração do cluster Kubernetes (GKE)
3. Instalação do stack de monitoramento (Prometheus + Grafana)
4. Build da imagem Docker da aplicação
5. Push da imagem para o Artifact Registry
6. Deploy automático no cluster via `kubectl apply`
7. Validação com `kubectl rollout status`
```

---

## 🏗️ Descrição dos Ambientes

| Ambiente   | Nuvem | Cluster       | Monitoramento         | Acesso Externo |
|------------|--------|----------------|------------------------|----------------|
| **Stage**      | GCP    | GKE `gke-stage` | Prometheus + Grafana   | IP externo via LoadBalancer |
| **Produção**   | GCP    | EKS `gke-prod`   | Prometheus + Grafana   | IP externo via LoadBalancer |

### 📊 Monitoramento

Ambos os ambientes utilizam **kube-prometheus-stack**, provisionado via Helm, contendo:
- Métricas de CPU e memória
- Status de pods
- Dashboards personalizados no Grafana
- Grafana exposto via `LoadBalancer` para acesso externo

---

## 📝 Observações Adicionais

- Temos dois namespaces criados, um para monitoramento (monitoring) e o default, onde está localizada nossa aplicação.
- Backend e banco estão com o tipo ClusterIP, permitindo somente a comunicação interna dentro do cluster.
- O Json do Grafana para criação da dashboard pode ser visualizado dentro da pasta [dashboard](dashboard/k8s_cluster_basic_metrics.json).


